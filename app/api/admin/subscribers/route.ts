import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD;
  return authHeader === `Bearer ${adminPassword}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: "서버 설정 미완료" }, { status: 503 });
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }

  return NextResponse.json(data);
}
