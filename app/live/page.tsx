import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, Video } from "lucide-react";

export default function LivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="content-width">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-blue mb-3 tracking-wide uppercase">
              라이브 강의
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
              라이브 강의 일정
            </h1>
            <p className="text-brand-gray text-lg mb-12">
              카카오채널 @생존마케팅을 추가하시면 라이브 강의 오픈 알림을 가장 먼저 받으실 수 있어요.
            </p>
          </div>

          {/* 라이브 없을 때 */}
          <div className="bg-brand-light rounded-2xl p-10 text-center max-w-lg">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full mb-4">
              <Video size={24} className="text-brand-gray" />
            </div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">
              현재 예정된 라이브가 없어요
            </h3>
            <p className="text-sm text-brand-gray mb-6">
              등록해두시면 다음 라이브 오픈 시 카카오톡으로 알려드릴게요.
            </p>
            <a
              href="/#signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-700 transition-colors"
            >
              알림 신청하기
            </a>
          </div>

          {/* 라이브 일정 힌트 */}
          <div className="mt-16 grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <Calendar size={20} className="text-brand-blue mb-3" />
              <h4 className="font-semibold text-brand-dark mb-1 text-sm">정기 라이브</h4>
              <p className="text-xs text-brand-gray">매월 2회 진행 (공지 채널 참고)</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <Clock size={20} className="text-brand-blue mb-3" />
              <h4 className="font-semibold text-brand-dark mb-1 text-sm">라이브 시간</h4>
              <p className="text-xs text-brand-gray">평일 저녁 8시 (2시간 진행)</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
