import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { broadcastSolapiAlimtalk } from "@/lib/solapi";

export async function POST(req: NextRequest) {
  try {
    // 관리자 인증
    const authHeader = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const body = await req.json();
    const { content, templateId } = body;

    if (!content || !templateId) {
      return NextResponse.json(
        { error: "content와 templateId는 필수입니다." },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "서버 설정이 완료되지 않았습니다." }, { status: 503 });
    }

    // 전체 구독자 전화번호 조회
    const { data: subscribers, error: dbError } = await supabase
      .from("subscribers")
      .select("phone");

    if (dbError) {
      return NextResponse.json(
        { error: "구독자 조회 실패" },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: "발송할 구독자가 없습니다." },
        { status: 400 }
      );
    }

    const phones = subscribers.map((s) => s.phone);

    // Solapi 일괄 알림톡 발송
    const { sentCount, failCount } = await broadcastSolapiAlimtalk({
      phones,
      templateId,
      variables: { "#{내용}": content },
    });

    // 발송 이력 저장
    await supabase.from("messages_log").insert({
      type: "broadcast",
      content,
      sent_count: sentCount,
      fail_count: failCount,
    });

    return NextResponse.json({
      success: true,
      sentCount,
      failCount,
      totalCount: phones.length,
    });
  } catch (err) {
    console.error("[broadcast API] 예외:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
