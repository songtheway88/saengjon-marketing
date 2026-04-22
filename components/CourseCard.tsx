import { Check, Users } from "lucide-react";
import type { Course } from "@/lib/courses";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div
      id={`course-${course.id}`}
      className="bg-white border border-gray-100 rounded-xl p-6 hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 flex flex-col"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      {/* 썸네일 영역 */}
      <div className="bg-brand-light rounded-lg h-32 flex items-center justify-center mb-5 relative overflow-hidden">
        <span className="text-5xl">{course.emoji}</span>
        {course.badge && (
          <span className="absolute top-3 right-3 bg-brand-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {course.badge}
          </span>
        )}
      </div>

      {/* 대상 */}
      <div className="flex items-center gap-1.5 text-xs text-brand-gray mb-2">
        <Users size={12} />
        <span>{course.target}</span>
      </div>

      {/* 강의명 */}
      <h3 className="text-base font-bold text-brand-dark mb-1.5 leading-snug">
        {course.title}
      </h3>

      {/* 한 줄 소개 */}
      <p className="text-sm text-brand-gray mb-4 leading-relaxed">
        {course.subtitle}
      </p>

      {/* 핵심 포인트 */}
      <ul className="space-y-1.5 flex-1">
        {course.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-brand-gray">
            <Check size={13} className="text-brand-blue mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}
