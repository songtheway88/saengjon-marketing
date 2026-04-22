import { ArrowDown, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="content-width">
        <div className="max-w-3xl">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue text-sm font-semibold px-3 py-1.5 rounded-full mb-8">
            <Zap size={14} className="fill-brand-blue" />
            AI로 콘텐츠 만드는 시간을 10배 줄이세요
          </div>

          {/* 헤드라인 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight tracking-tight mb-6">
            혼자서도 되는
            <br />
            <span className="text-brand-blue">AI 콘텐츠 자동화</span>
            <br />
            강의 5종
          </h1>

          {/* 서브 카피 */}
          <p className="text-lg sm:text-xl text-brand-gray leading-relaxed mb-10 max-w-2xl">
            노트북LM, 제미나이, 클로드, Vrew까지.
            <br className="hidden sm:block" />
            코딩 몰라도, 편집 몰라도 OK. 실무에서 바로 쓰는 AI 강의입니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-brand-blue rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              지금 무료 등록하기
            </a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-brand-dark bg-brand-light rounded-xl hover:bg-gray-100 transition-colors"
            >
              강의 둘러보기
              <ArrowDown size={16} />
            </a>
          </div>

          {/* 소셜 프루프 */}
          <div className="mt-12 flex items-center gap-6 text-sm text-brand-gray">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-brand-dark text-base">500+</span>
              <span>수강생</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-brand-dark text-base">5종</span>
              <span>실무 강의</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-brand-dark text-base">@생존마케팅</span>
              <span>카카오채널</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
