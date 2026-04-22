import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Youtube, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="content-width">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-blue mb-3 tracking-wide uppercase">
              대표 소개
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-8">
              안녕하세요,
              <br />
              송덕일입니다 👋
            </h1>

            {/* 프로필 */}
            <div className="bg-brand-light rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-2xl text-white font-bold shrink-0">
                  송
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-dark mb-1">송덕일</h2>
                  <p className="text-sm text-brand-blue font-semibold mb-3">
                    @생존마케팅 대표
                  </p>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    AI 도구로 마케팅 업무를 자동화하는 방법을 가르치고 있습니다.
                    혼자 운영하는 스몰 비즈니스도, 1인 크리에이터도
                    AI를 잘 쓰면 대기업 마케팀 부럽지 않습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 소개 본문 */}
            <div className="space-y-5 text-brand-gray leading-relaxed mb-10">
              <p>
                저는 마케팅 대행사에서 10년 넘게 일하면서, 항상 "더 빠르게, 더 적은 비용으로"
                결과를 만들어야 하는 압박 속에서 살았습니다.
              </p>
              <p>
                AI가 등장했을 때 처음엔 반신반의했어요. 그런데 직접 써보니 달랐습니다.
                혼자서 콘텐츠 팀 3명이 하던 일을 할 수 있게 됐고,
                클라이언트 보고서 작성 시간이 6시간에서 30분으로 줄었습니다.
              </p>
              <p>
                이걸 혼자만 알고 쓰기엔 너무 아까워서 강의를 만들었습니다.
                코딩 몰라도, 편집 몰라도 OK. 실무에서 바로 쓰는 AI 강의입니다.
              </p>
            </div>

            {/* 채널 링크 */}
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="https://pf.kakao.com/_생존마케팅"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl hover:border-yellow-300 transition-colors"
              >
                <MessageCircle size={20} className="text-yellow-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-brand-dark">카카오채널</div>
                  <div className="text-xs text-brand-gray">@생존마케팅</div>
                </div>
              </a>
              <a
                href="https://youtube.com/@생존마케팅"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl hover:border-red-300 transition-colors"
              >
                <Youtube size={20} className="text-red-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-brand-dark">유튜브</div>
                  <div className="text-xs text-brand-gray">@생존마케팅</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
