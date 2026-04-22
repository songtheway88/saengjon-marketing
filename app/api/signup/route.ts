import { NextRequest, NextResponse } from "next/server";
import { saveToGoogleSheets } from "@/lib/google-sheets";
import { sendWelcomeAlimtalk } from "@/lib/solapi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, selectedCourses } = body;

    // ── 1. 입력값 검증 ──────────────────────────────────────────
    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 연락처는 필수입니다." },
        { status: 400 }
      );
    }

    if (!Array.isArray(selectedCourses) || selectedCourses.length === 0) {
      return NextResponse.json(
        { error: "관심 강의를 최소 1개 선택해주세요." },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/-/g, "");
    if (!/^01[0-9]{8,9}$/.test(phoneDigits)) {
      return NextResponse.json(
        { error: "올바른 휴대폰 번호 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // ── 2. 구글 시트 저장 (비동기, 실패해도 진행) ──────────────
    saveToGoogleSheets({
      name: name.trim(),
      email: (email ?? "").trim(),
      phone: phoneDigits,
      courses: selectedCourses,
    }).catch((err) => console.error("[구글시트] 저장 예외:", err));

    // ── 3. Solapi 알림톡 → 고객 모바일 발송 ────────────────────
    sendWelcomeAlimtalk(phoneDigits, name.trim())
      .then((result) => {
        if (result.dev) console.log("[Solapi] DEV 모드 — 콘솔 로그만");
        if (!result.success) console.error("[Solapi] 발송 실패:", result.error);
      })
      .catch((err) => console.error("[Solapi] 예외:", err));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[signup API] 예외:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
