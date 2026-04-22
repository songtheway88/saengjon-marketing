"use client";

import Script from "next/script";

export default function SignupForm() {
  const KAKAO_CHANNEL_ID = "_fpxgTn";

  const handleAddChannel = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Channel.addChannel({ channelPublicId: KAKAO_CHANNEL_ID });
    } else {
      window.open(`https://pf.kakao.com/${KAKAO_CHANNEL_ID}`, "_blank");
    }
  };

  return (
    <>
      <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" strategy="lazyOnload" />
      <section id="signup" className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wide uppercase">
                수강 신청
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                본 페이지에서 바로
                <br />
                강의 신청하기
              </h2>
              <p className="text-gray-500 mb-10">
                채널 추가 후 바로 강의 신청이 가능합니다.
              </p>

              <button
                onClick={handleAddChannel}
                className="w-full sm:w-auto px-8 py-5 text-lg font-bold bg-[#FEE500] text-[#3A1D1D] rounded-xl hover:bg-[#FDD800] transition-colors inline-flex items-center justify-center gap-3 shadow-sm mx-auto"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 18 18"
                  fill="#3A1D1D"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 1.5C4.858 1.5 1.5 4.186 1.5 7.5c0 2.045 1.26 3.84 3.15 4.905L3.75 15l3.418-2.278A8.35 8.35 0 0 0 9 12.75c4.142 0 7.5-2.686 7.5-5.25S13.142 1.5 9 1.5z"
                  />
                </svg>
                카카오톡 채널 추가하고 강의 신청하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
