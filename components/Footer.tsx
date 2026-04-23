export default function Footer() {
  return (
    <footer className="bg-brand-light border-t border-gray-100 py-12">
      <div className="content-width px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-lg font-bold text-brand-dark mb-1">바이럴러스</div>
            <p className="text-sm text-brand-gray">
              AI 콘텐츠 자동화를 혼자서도 할 수 있도록
            </p>
            <p className="text-sm text-brand-gray mt-1">
              카카오채널:{" "}
              <a
                href="http://pf.kakao.com/_fpxgTn/chat"
                className="text-brand-blue hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @생존마케팅
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-brand-gray">
            <a href="#courses" className="hover:text-brand-dark transition-colors">강의 목록</a>
            <a href="#signup" className="hover:text-brand-dark transition-colors">수강 신청</a>
            <a href="/live" className="hover:text-brand-dark transition-colors">라이브 일정</a>
            <a href="/about" className="hover:text-brand-dark transition-colors">대표 소개</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-brand-gray">
          © {new Date().getFullYear()} 바이럴러스 (생존마케팅). All rights reserved.
        </div>
      </div>
    </footer>
  );
}
