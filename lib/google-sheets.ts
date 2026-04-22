/**
 * 구글 시트 저장 — Google Apps Script 웹훅 방식
 *
 * 설정 방법:
 *   1. https://sheets.google.com 에서 새 스프레드시트 생성
 *   2. 확장 프로그램 → Apps Script 클릭
 *   3. 아래 코드를 붙여넣고 저장 (Ctrl+S)
 *   4. 배포 → 새 배포 → 웹 앱
 *      - 다음 사용자로 실행: 나
 *      - 액세스 권한: 모든 사용자
 *   5. 배포 URL을 복사 → GOOGLE_SHEETS_WEBHOOK_URL 에 입력
 *
 * ── Apps Script 코드 (그대로 복붙) ──────────────────────────
 *
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *
 *     // 헤더가 없으면 첫 행에 추가
 *     if (sheet.getLastRow() === 0) {
 *       sheet.appendRow(['등록일시', '이름', '이메일', '연락처', '관심강의']);
 *     }
 *
 *     sheet.appendRow([
 *       new Date().toLocaleString('ko-KR'),
 *       data.name || '',
 *       data.email || '',
 *       data.phone || '',
 *       (data.courses || []).join(', '),
 *     ]);
 *
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (err) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * ─────────────────────────────────────────────────────────────
 */

interface SheetRow {
  name: string;
  email: string;
  phone: string;
  courses: string[];
}

export async function saveToGoogleSheets(data: SheetRow): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[구글시트 DEV] 웹훅 미설정 — 로그만 출력:", data);
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("[구글시트] 저장 실패:", res.status);
      return;
    }

    const json = await res.json().catch(() => ({}));
    if (!json.success) {
      console.error("[구글시트] 응답 오류:", json.error);
    }
  } catch (err) {
    // 시트 저장 실패해도 사용자 흐름은 중단하지 않음
    console.error("[구글시트] 네트워크 오류:", err);
  }
}
