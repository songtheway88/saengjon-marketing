/**
 * Solapi 알림톡 API 연동
 * https://docs.solapi.com/
 *
 * 필요 환경변수:
 *   SOLAPI_API_KEY         — Solapi API Key
 *   SOLAPI_API_SECRET      — Solapi API Secret
 *   SOLAPI_PFID            — 카카오 채널 발신프로필 ID (KA01PF...)
 *   SOLAPI_TEMPLATE_ID_WELCOME   — 환영 알림톡 템플릿 ID (KA01TP...)
 *   SOLAPI_TEMPLATE_ID_BROADCAST — 일괄 발송 템플릿 ID
 *
 * 개발 모드: 환경변수 미설정 시 콘솔 로그만 출력
 */

import { createHmac, randomBytes } from "crypto";

const SOLAPI_BASE = "https://api.solapi.com";

interface SendResult {
  success: boolean;
  dev?: boolean;
  error?: string;
}

/**
 * Solapi HMAC-SHA256 인증 헤더 생성
 */
function buildAuthHeader(apiKey: string, apiSecret: string): string {
  const date = new Date().toISOString();
  const salt = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", apiSecret)
    .update(date + salt)
    .digest("hex");
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

/**
 * 알림톡 단건 발송
 */
export async function sendSolapiAlimtalk({
  phone,
  templateId,
  variables = {},
}: {
  phone: string;
  templateId: string;
  variables?: Record<string, string>;
}): Promise<SendResult> {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const pfId = process.env.SOLAPI_PFID;

  // 개발 모드
  if (!apiKey || !apiSecret || !pfId) {
    console.log(
      `[Solapi DEV] 알림톡 시뮬레이션\n  수신번호: ${phone}\n  템플릿: ${templateId}\n  변수:`,
      variables
    );
    return { success: true, dev: true };
  }

  const cleanPhone = phone.replace(/-/g, "");

  try {
    const res = await fetch(`${SOLAPI_BASE}/messages/v4/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: buildAuthHeader(apiKey, apiSecret),
      },
      body: JSON.stringify({
        message: {
          to: cleanPhone,
          kakaoOptions: {
            pfId,
            templateId,
            variables,
          },
        },
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("[Solapi] 발송 실패:", json);
      return { success: false, error: json.message || "발송 실패" };
    }

    return { success: true };
  } catch (err) {
    console.error("[Solapi] 네트워크 오류:", err);
    return { success: false, error: "네트워크 오류" };
  }
}

/**
 * 환영 알림톡 발송 (카카오 OAuth 완료 후 자동 발송)
 *
 * 템플릿 예시:
 *   안녕하세요 #{이름}님! 👋
 *   생존마케팅 AI 강의에 등록해주셨어요.
 *   강의 오픈 시 가장 먼저 안내드릴게요.
 *   #{링크}
 */
export async function sendWelcomeAlimtalk(
  phone: string,
  name: string
): Promise<SendResult> {
  const templateId = process.env.SOLAPI_TEMPLATE_ID_WELCOME;

  if (!templateId) {
    console.log(
      `[Solapi DEV] 환영 알림톡 (템플릿 미설정)\n  수신번호: ${phone}\n  이름: ${name}`
    );
    return { success: true, dev: true };
  }

  return sendSolapiAlimtalk({
    phone,
    templateId,
    variables: {
      "#{이름}": name,
      "#{링크}": "https://viralers.io/#courses",
    },
  });
}

/**
 * 일괄 알림톡 발송 (관리자 → 전체 구독자)
 */
export async function broadcastSolapiAlimtalk({
  phones,
  templateId,
  variables = {},
}: {
  phones: string[];
  templateId: string;
  variables?: Record<string, string>;
}): Promise<{ sentCount: number; failCount: number }> {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const pfId = process.env.SOLAPI_PFID;

  if (!apiKey || !apiSecret || !pfId) {
    console.log(`[Solapi DEV] 일괄 발송 시뮬레이션 — ${phones.length}건`);
    return { sentCount: phones.length, failCount: 0 };
  }

  const BATCH_SIZE = 100;
  let sentCount = 0;
  let failCount = 0;

  for (let i = 0; i < phones.length; i += BATCH_SIZE) {
    const batch = phones.slice(i, i + BATCH_SIZE);

    try {
      const res = await fetch(`${SOLAPI_BASE}/messages/v4/send-many`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: buildAuthHeader(apiKey, apiSecret),
        },
        body: JSON.stringify({
          messages: batch.map((phone) => ({
            to: phone.replace(/-/g, ""),
            kakaoOptions: {
              pfId,
              templateId,
              variables,
            },
          })),
        }),
      });

      if (res.ok) {
        sentCount += batch.length;
      } else {
        const err = await res.json().catch(() => ({}));
        console.error("[Solapi] 배치 발송 실패:", err);
        failCount += batch.length;
      }
    } catch (err) {
      console.error("[Solapi] 배치 네트워크 오류:", err);
      failCount += batch.length;
    }
  }

  return { sentCount, failCount };
}
