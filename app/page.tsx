import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "바이럴러스 - 회사 소개",
  description: "기술의 장벽을 낮춰 누구나 AI로 비즈니스를 성장시킬 수 있도록 돕습니다.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 히어로 섹션 */}
        <section className="pt-32 pb-24 px-4 sm:px-6">
          <div className="content-width max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight tracking-tight mb-6">
              AI 콘텐츠 자동화를<br />혼자서도 할 수 있도록<br />
              <span className="text-brand-blue">바이럴러스</span>
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray leading-relaxed mb-10 max-w-2xl mx-auto">
              기술의 장벽을 낮춰 누구나 AI로 비즈니스를 성장시킬 수 있도록 돕습니다.
            </p>
          </div>
        </section>

        {/* 대표 소개 섹션 */}
        <section id="about" className="section-padding bg-gray-50 border-t border-gray-100">
          <div className="content-width max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-brand-blue mb-3 tracking-wide uppercase">CEO Profile</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
                송덕일 <span className="text-xl sm:text-2xl text-brand-gray font-medium">(바이럴러스 대표)</span>
              </h2>
            </div>
            
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 lg:gap-12">
              <div className="flex-1 space-y-6">
                <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-3">학력 및 주요 경력</h3>
                <ul className="space-y-3.5 text-brand-gray text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1">•</span> 23년 1월 바이럴러스 창업
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1">•</span> 경희대학교 성악과 및 동대학원 졸업
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1">•</span> 경희대학교 음악대학 대학원 조교
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1">•</span> 서울모테트합창단 정단원 역임
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1">•</span> 중앙예닮학교 강사
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1">•</span> 충남예고 강사
                  </li>
                </ul>
              </div>
              
              <div className="hidden md:block w-px bg-gray-100"></div>

              <div className="flex-1 space-y-6">
                <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-3">수상 내역</h3>
                <ul className="space-y-3.5 text-brand-gray text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">🏆</span>
                    <span>천안문화도시 문화초기창업 데모데이 <strong className="text-brand-dark font-semibold">최우수상</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">🏆</span>
                    <span>천안문화도시 문화초기창업 네트워킹데이 <strong className="text-brand-dark font-semibold">대상</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">💡</span>
                    <span>호서대학교 과학벨트 선정 사업</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">🎖️</span>
                    <span>천안문화도시 뜰마켓 <strong className="text-brand-dark font-semibold">장려상</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 대행 포트폴리오 */}
        <section id="portfolio" className="section-padding bg-white border-t border-gray-100">
          <div className="content-width max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-brand-blue mb-3 tracking-wide uppercase">Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
                광고 대행 및 채널 운영
              </h2>
              <p className="text-brand-gray">다양한 기관과 브랜드의 성공적인 영상 마케팅을 이끌고 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "저스피스재단(GD재단)", desc: "‘영웅회복'사업 SNS 컨설팅 및 영상 마케팅", link: "https://www.youtube.com/@herove_official" },
                { title: "전남 진도군", desc: "로컬 브랜딩 사업 바이럴 용역", link: "https://www.youtube.com/watch?v=4vt7_aa5i7s&t=5s" },
                { title: "경희대학교 음악대학", desc: "개교 70주년 기념음악회 영상마케팅", link: "https://www.youtube.com/watch?v=iiAJ182pkYY&t=59s" },
                { title: "경희대학교 음악대학장", desc: "유튜브채널 운영대행 <메조의여왕>", link: "https://www.youtube.com/@%EB%A9%94%EC%A1%B0%EC%9D%98%EC%97%AC%EC%99%95_%EC%9D%B4%EC%95%84%EA%B2%BD" },
                { title: "전 서울대공원장 안영노", desc: "유튜브 운영 <안영노의 말>", link: "https://www.youtube.com/@youngyes" },
                { title: "오페라연출가 이의주", desc: "유튜브 채널 운영 <오파주>", link: "https://www.youtube.com/@-opaju" },
                { title: "못난이꽈배기", desc: "브랜드 종합광고대행", link: "https://www.youtube.com/@monnanifood" },
                { title: "삽교호전망대종합어시장", desc: "종합광고대행", link: "https://www.youtube.com/watch?v=KppnzVSePJM" },
                { title: "탑토퍼", desc: "토퍼 매트리스 브랜드 종합광고대행", link: "https://www.youtube.com/@%ED%83%91%ED%86%A0%ED%8D%BC" },
                { title: "오마이어스", desc: "CRM 마케팅 스타트업 브랜드 채널 대행", link: "https://www.youtube.com/@Desire.X-file" },
                { title: "KHB파트너스", desc: "법률사무소 영상콘텐츠", link: "https://www.youtube.com/@lawkimhb" },
                { title: "아산숲속어린이집", desc: "종합광고대행", link: null },
                { title: "전주 인퍼트", desc: "임상심리&언어치료 센터", link: null },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:border-brand-blue hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-bold text-brand-dark mb-2 text-lg group-hover:text-brand-blue transition-colors">{item.title}</h3>
                  <p className="text-sm text-brand-gray mb-4">{item.desc}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-blue-700">
                      채널 보기
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 교육 세션 요약 */}
        <section id="education" className="section-padding bg-brand-blue border-t border-blue-600 text-white">
          <div className="content-width max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-blue-200 mb-3 tracking-wide uppercase">Education</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                교육 및 커뮤니티
              </h2>
              <p className="text-blue-100">현장에서 검증된 노하우를 바탕으로 실질적인 교육을 제공합니다.</p>
            </div>

            <div className="bg-blue-800/40 p-8 sm:p-10 rounded-2xl border border-blue-700 mb-10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-xl">🎓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">천안 소상공인 마케팅 스터디</h4>
                    <p className="text-blue-200 text-sm">10주 코스 운영 (브랜딩 블로그)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-xl">🎓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">청주 서원대학교</h4>
                    <p className="text-blue-200 text-sm">디지털특성화대학 강사/멘토</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-xl">🤝</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">커뮤니티 '막케팅' 운영</h4>
                    <p className="text-blue-200 text-sm">천안아산 소상공인 마케팅 커뮤니티</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-xl">📚</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">온라인 교육 & 전자책</h4>
                    <p className="text-blue-200 text-sm">나를 대신하는 AI 아바타 (오마이컴퍼니)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-xl">🏢</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">천안 여성새로일하기센터</h4>
                    <p className="text-blue-200 text-sm">직업교육훈련 현장실습 (2025년)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="/education" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-brand-blue bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-lg shadow-blue-900/20">
                생존마케팅 AI 교육 세션 보러가기
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
