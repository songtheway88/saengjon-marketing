import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD;
  return authHeader === `Bearer ${adminPassword}`;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = await req.json();
  const { title, date, link, is_active } = body;

  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: "서버 설정 미완료" }, { status: 503 });

  // 기존 배너 비활성화
  await supabase.from("live_banner").update({ is_active: false }).neq("id", "00000000-0000-0000-0000-000000000000");

  if (is_active && title) {
    // 새 배너 삽입
    const { error } = await supabase.from("live_banner").insert({
      title,
      date: date || "",
      link: link || "",
      is_active: true,
    });

    if (error) {
      return NextResponse.json({ error: "저장 실패" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
