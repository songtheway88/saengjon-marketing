import CourseCard from "./CourseCard";
import { courses } from "@/lib/courses";

export default function CourseGrid() {
  return (
    <section id="courses" className="section-padding bg-brand-light">
      <div className="content-width">
        {/* 섹션 헤더 */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-blue mb-3 tracking-wide uppercase">
            강의 목록
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            지금 바로 시작할 수 있는
            <br />
            AI 실무 강의 5종
          </h2>
          <p className="text-brand-gray text-lg max-w-xl">
            복잡한 설정 없이, 오늘 배우고 내일 업무에 바로 적용하세요.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
