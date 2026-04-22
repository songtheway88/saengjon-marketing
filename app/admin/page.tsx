"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Send,
  LogOut,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  phone: string;
  courses: string[];
  created_at: string;
  kakao_sent: boolean;
}

interface MessageLog {
  id: string;
  type: string;
  content: string;
  sent_count: number;
  fail_count: number;
  sent_at: string;
}

const COURSE_NAMES: Record<string, string> = {
  "notebooklm-gemini": "노트북LM + 제미나이",
  "gemini-gems-shorts": "제미나이 젬스 쇼츠",
  "vrew-editing": "Vrew 영상 편집",
  "claude-complete": "클로드 완전정복",
  "antigravity-beginner": "안티그래비티 왕초보",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [logs, setLogs] = useState<MessageLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [broadcastContent, setBroadcastContent] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [broadcastStatus, setBroadcastStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [broadcastResult, setBroadcastResult] = useState<{
    sentCount: number;
    failCount: number;
    totalCount: number;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"subscribers" | "broadcast" | "logs">(
    "subscribers"
  );
  const [showLiveBannerForm, setShowLiveBannerForm] = useState(false);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDate, setBannerDate] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [bannerStatus, setBannerStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const loadData = useCallback(async () => {
    if (!isAuthed) return;
    setIsLoading(true);
    try {
      const [subRes, logRes] = await Promise.all([
        fetch("/api/admin/subscribers", {
          headers: { Authorization: `Bearer ${password}` },
        }),
        fetch("/api/admin/logs", {
          headers: { Authorization: `Bearer ${password}` },
        }),
      ]);

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData);
      }
      if (logRes.ok) {
        const logData = await logRes.json();
        setLogs(logData);
      }
    } catch (err) {
      console.error("데이터 로드 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthed, password]);

  useEffect(() => {
    if (isAuthed) loadData();
  }, [isAuthed, loadData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPw = process.env.NEXT_PUBLIC_ADMIN_HINT || "";
    // 클라이언트에서 직접 비교하지 않고 API로 확인
    if (password.length >= 4) {
      setIsAuthed(true);
      setAuthError("");
    } else {
      setAuthError("비밀번호를 입력해주세요.");
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastContent.trim()) return;
    setBroadcastStatus("loading");
    setBroadcastResult(null);

    try {
      const res = await fetch("/api/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          content: broadcastContent,
          templateId: templateId || process.env.NEXT_PUBLIC_DEFAULT_TEMPLATE || "broadcast",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setBroadcastStatus("success");
        setBroadcastResult(data);
        setBroadcastContent("");
        loadData();
      } else {
        throw new Error(data.error || "발송 실패");
      }
    } catch (err) {
      setBroadcastStatus("error");
      console.error(err);
    }
  };

  const handleBannerUpdate = async () => {
    setBannerStatus("loading");
    try {
      const res = await fetch("/api/admin/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          title: bannerTitle,
          date: bannerDate,
          link: bannerLink,
          is_active: !!bannerTitle,
        }),
      });

      if (res.ok) {
        setBannerStatus("success");
        setTimeout(() => setBannerStatus("idle"), 2000);
      } else {
        setBannerStatus("error");
      }
    } catch {
      setBannerStatus("error");
    }
  };

  // 로그인 화면
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">🔒</div>
            <h1 className="text-xl font-bold text-brand-dark">관리자 페이지</h1>
            <p className="text-sm text-brand-gray mt-1">생존마케팅</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
              autoFocus
            />
            {authError && (
              <p className="text-xs text-red-500">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <span className="font-bold text-brand-dark">관리자</span>
            <span className="text-xs text-brand-gray">@생존마케팅</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 text-brand-gray hover:text-brand-dark disabled:opacity-50"
              title="새로고침"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => { setIsAuthed(false); setPassword(""); }}
              className="flex items-center gap-1.5 text-sm text-brand-gray hover:text-brand-dark"
            >
              <LogOut size={16} />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-brand-dark">{subscribers.length}</div>
            <div className="text-sm text-brand-gray mt-1">총 구독자</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-brand-dark">
              {subscribers.filter((s) => s.kakao_sent).length}
            </div>
            <div className="text-sm text-brand-gray mt-1">카카오 발송 완료</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-brand-dark">{logs.length}</div>
            <div className="text-sm text-brand-gray mt-1">발송 이력</div>
          </div>
        </div>

        {/* 라이브 배너 관리 */}
        <div className="bg-white rounded-xl border border-gray-100 mb-6 overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setShowLiveBannerForm(!showLiveBannerForm)}
          >
            <span className="font-semibold text-brand-dark text-sm">
              🔴 라이브 배너 관리
            </span>
            {showLiveBannerForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showLiveBannerForm && (
            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              <input
                type="text"
                placeholder="배너 제목 (비워두면 배너 OFF)"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
              />
              <input
                type="text"
                placeholder="날짜 (예: 4월 15일 오후 8시)"
                value={bannerDate}
                onChange={(e) => setBannerDate(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
              />
              <input
                type="url"
                placeholder="신청 링크 URL"
                value={bannerLink}
                onChange={(e) => setBannerLink(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
              />
              <button
                onClick={handleBannerUpdate}
                disabled={bannerStatus === "loading"}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
              >
                {bannerStatus === "loading" && <Loader2 size={14} className="animate-spin" />}
                {bannerStatus === "success" ? "저장 완료 ✓" : "저장하기"}
              </button>
            </div>
          )}
        </div>

        {/* 탭 */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 w-fit">
          {(["subscribers", "broadcast", "logs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-brand-blue text-white"
                  : "text-brand-gray hover:text-brand-dark"
              }`}
            >
              {tab === "subscribers" && "구독자 목록"}
              {tab === "broadcast" && "일괄 발송"}
              {tab === "logs" && "발송 이력"}
            </button>
          ))}
        </div>

        {/* 구독자 목록 */}
        {activeTab === "subscribers" && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Users size={16} className="text-brand-gray" />
              <span className="font-semibold text-sm text-brand-dark">
                구독자 목록 ({subscribers.length}명)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-light">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-brand-gray">이름</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-brand-gray">이메일</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-brand-gray">연락처</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-brand-gray">관심 강의</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-brand-gray">카카오</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-brand-gray">등록일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-brand-light/50">
                      <td className="px-4 py-3 font-medium text-brand-dark">{sub.name}</td>
                      <td className="px-4 py-3 text-brand-gray">{sub.email}</td>
                      <td className="px-4 py-3 text-brand-gray">{sub.phone}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {sub.courses?.map((c) => (
                            <span
                              key={c}
                              className="text-xs bg-blue-50 text-brand-blue px-1.5 py-0.5 rounded"
                            >
                              {COURSE_NAMES[c] || c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {sub.kakao_sent ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <AlertCircle size={16} className="text-gray-300" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-brand-gray text-xs">
                        {new Date(sub.created_at).toLocaleDateString("ko-KR")}
                      </td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-brand-gray text-sm">
                        등록된 구독자가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 일괄 발송 */}
        {activeTab === "broadcast" && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Send size={16} className="text-brand-gray" />
              <h2 className="font-semibold text-sm text-brand-dark">카카오 일괄 발송</h2>
              <span className="text-xs text-brand-gray ml-auto">
                전체 {subscribers.length}명에게 발송
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  템플릿 코드
                </label>
                <input
                  type="text"
                  placeholder="카카오 알림톡 템플릿 코드"
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  메시지 내용
                </label>
                <textarea
                  rows={5}
                  placeholder="전송할 메시지 내용을 입력하세요..."
                  value={broadcastContent}
                  onChange={(e) => setBroadcastContent(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>

              {broadcastStatus === "success" && broadcastResult && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                  <CheckCircle size={16} />
                  발송 완료: {broadcastResult.sentCount}건 성공 / {broadcastResult.failCount}건 실패
                </div>
              )}

              {broadcastStatus === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  <AlertCircle size={16} />
                  발송 중 오류가 발생했습니다.
                </div>
              )}

              <button
                onClick={handleBroadcast}
                disabled={broadcastStatus === "loading" || !broadcastContent.trim() || subscribers.length === 0}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {broadcastStatus === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                전체 발송 ({subscribers.length}명)
              </button>
            </div>
          </div>
        )}

        {/* 발송 이력 */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <span className="font-semibold text-sm text-brand-dark">
                발송 이력 ({logs.length}건)
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {logs.map((log) => (
                <div key={log.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      log.type === "welcome"
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`}>
                      {log.type === "welcome" ? "환영 메시지" : "일괄 발송"}
                    </span>
                    <span className="text-xs text-brand-gray">
                      {new Date(log.sent_at).toLocaleString("ko-KR")}
                    </span>
                  </div>
                  <p className="text-sm text-brand-dark mb-2 line-clamp-2">{log.content}</p>
                  <div className="flex gap-4 text-xs text-brand-gray">
                    <span>✅ 성공 {log.sent_count}건</span>
                    <span>❌ 실패 {log.fail_count}건</span>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="px-5 py-12 text-center text-brand-gray text-sm">
                  발송 이력이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
