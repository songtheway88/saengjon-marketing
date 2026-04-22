"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviewsData = [
  { text: "강의 평가지 이제야 보고 제출했습니다. 애매하게 들어만봤던 AI 도구들을 깊이 있게 배울 수 있어서 소중한 시간이었습니다. 하나라도 더 알려주시려고 하는 모습과 수강생들을 배려하시면서 수업 진행하시는 모습이 감동이었어요.정말 고맙습니다.", initial: "정", name: "정*선" },
  { text: "진심으로 감사했습니다..!! 앞으로 무엇이든 번창하시고 건강하세요!!!", initial: "푸", name: "푸*름" },
  { text: "Ai 활용법에 대해 더 많이 알게된 진짜 좋은 시간이었어요! 대표님께 정말 감사드립니다 😊😊😊", initial: "김", name: "김*실" },
  { text: "Ai 사용하는 법을 익히게 해주셔서 너무 좋은 강의 였습니다, 더 발전해서 좋은 결과물 만들어 보겠습니다!!😊", initial: "라", name: "라*" },
  { text: "열정적인 대표님 덕분에 AI시대로 깊이 다가갈수 있는 귀중한 시간 이였습니다. 진심으로 감사드립니다 ~", initial: "l", name: "l**y" },
  { text: "정말 유익하고 좋은 강의였습니다!! 대표님께서 어려운 부분들을 쉽게 설명해주시고 좋은 정보 있으면 지속적으로 강의 내용에 추가도 해주시면서 저희에게 정말 많이 나눠주신 것 같아요~~ 혼자서도 많은 일들을 할 수 있게 해주셔서 정말 감사합니다!! 😁👍👍", initial: "다", name: "다*" },
  { text: "선생님!! 지금까지 주옥같은 강의 감사했습니다!!! 까먹을때마다 전자책 다시훑어보고 열공하겠습니다!!!", initial: "푸", name: "푸*름" },
  { text: "강사님덕분에 많이 배웠습니다 감사합니다~!!!!!", initial: "아", name: "아**린" },
  { text: "모르는거 많이 배우고 유익한 시간이었습니다..감사합니다~~", initial: "황", name: "황*화" },
  { text: "소중한 강의 감사드려요 ^^ 많이 배웠습니다~", initial: "y", name: "y***♡" },
  { text: "저도 강사님 덕분에 제가 평소 배우고 싶었던 것들 좀더쉽게 다가갈수 있어서 너무 좋았어요😊 열정적으로 강의해주셔서 감사합니다☺️", initial: "이", name: "이*정" },
  { text: "어떤 업무에도 적용할수 있는 ai 기초를 잘 다져나갈 수 있었던 귀중한 시간이었습니다~! 항상 열정있게 강의해주셨던 대표님께 깊이 감사드립니다👍👍", initial: "좋", name: "좋*" }
];

export default function Reviews() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollAmount = () => {
    if (!sliderRef.current) return 0;
    const item = sliderRef.current.querySelector(".review-item") as HTMLElement;
    if (!item) return 0;
    return item.offsetWidth + parseFloat(getComputedStyle(sliderRef.current).gap || "0");
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    }
  };

  return (
    <section id="reviews" className="section-padding bg-gray-50 border-t border-gray-100">
      <div className="content-width relative">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wide uppercase">Review</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            먼저 경험한 수강생들의 생생한 후기
          </h2>
        </div>
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition border border-gray-100 hidden sm:flex"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition border border-gray-100 hidden sm:flex"
          >
            <ChevronRight size={24} />
          </button>
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {reviewsData.map((review, idx) => (
              <div
                key={idx}
                className="review-item bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between hover:border-blue-200 transition-colors shrink-0 max-w-[85%] sm:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(33.333%-1rem)] snap-center sm:snap-start"
                style={{ width: "100%", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="text-sm sm:text-base text-gray-900 leading-relaxed mb-6 break-keep whitespace-pre-wrap">
                  "{review.text}"
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFEB00] rounded-full flex items-center justify-center text-[#3A1D1D] font-bold text-sm shrink-0">
                    {review.initial}
                  </div>
                  <div className="text-sm font-bold text-gray-900">{review.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
