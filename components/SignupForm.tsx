"use client";

import { useState } from "react";
import { CheckCircle, Loader2, AlertCircle, Play, BookOpen, Lock } from "lucide-react";
import { courses } from "@/lib/courses";

interface FormData {
  name: string;
  email: string;
  phone: string;
  selectedCourses: string[];
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    selectedCourses: [],
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCourseToggle = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(courseId)
        ? prev.selectedCourses.filter((id) => id !== courseId)
        : [...prev.selectedCourses, courseId],
    }));
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedCourses.length === 0) {
      setErrorMessage("관심 있는 강의를 최소 1개 선택해주세요.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "등록 중 오류가 발생했습니다.");
      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "등록 중 오류가 발생했습니다.");
      setStatus("error");
    }
  };

  // ── 성공 화면: 신청한 강의 콘텐츠 제공 ──────────────────────
  if (status === "success") {
    const registeredCourses = courses.filter((c) =>
      formData.selectedCourses.includes(c.id)
    );

    return (
      <section id="signup" className="section-padding bg-white">
        <div className="content-width">
          <div className="max-w-2xl mx-auto">
            {/* 완료 헤더 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">등록 완료! 🎉</h3>
              <p className="text-brand-gray text-sm">
                카카오채널 <strong>@생존마케팅</strong>으로 알림톡을 보내드렸어요.
                <br />
                신청하신 강의 콘텐츠를 바로 확인하세요.
              </p>
            </div>

            {/* 신청한 강의 콘텐츠 카드 */}
            <div className="space-y-4">
              {registeredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-brand-light border border-gray-100 rounded-2xl p-5"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{course.emoji}</span>
                    <div>
                      <div className="font-semibold text-brand-dark text-sm leading-snug">
                        {course.title}
                      </div>
                      <div className="text-xs text-brand-gray mt-0.5">{course.subtitle}</div>
                    </div>
                    {course.is_paid && (
                      <span className="ml-auto shrink-0 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        유료
                      </span>
                    )}
                  </div>

                  {course.is_paid ? (
                    /* 유료 강의 — 카카오페이 결제 예정 */
                    <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-700">
                      <Lock size={15} className="shrink-0" />
                      <span>
                        <strong>{course.price}</strong> · 카카오페이 결제 기능 준비 중이에요.
                        오픈되면 @생존마케팅 채널로 안내드릴게요!
                      </span>
                    </div>
                  ) : (
                    /* 무료 강의 — 영상·전자책 링크 */
                    <div className="flex flex-col sm:flex-row gap-2">
                      {course.video_url ? (
                        <a
                          href={course.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 bg-brand-blue text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          <Play size={15} fill="white" />
                          강의 영상 보기
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 bg-gray-100 text-gray-400 text-sm rounded-xl">
                          <Play size={15} />
                          영상 준비 중
                        </div>
                      )}
                      {course.ebook_url ? (
                        <a
                          href={course.ebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 bg-white border border-brand-blue text-brand-blue text-sm font-medium rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          <BookOpen size={15} />
                          전자책 다운로드
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 bg-gray-100 text-gray-400 text-sm rounded-xl">
                          <BookOpen size={15} />
                          전자책 준비 중
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 카카오채널 추가 유도 */}
            <div className="mt-6 text-center">
              <p className="text-xs text-brand-gray mb-3">
                강의 오픈 알림을 가장 먼저 받으려면 채널을 추가하세요
              </p>
              <a
                href="https://pf.kakao.com/_fpxgTn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FEE500] text-yellow-900 text-sm font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
              >
                카카오채널 @생존마케팅 추가하기
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── 입력 폼 ──────────────────────────────────────────────────
  return (
    <section id="signup" className="section-padding bg-white">
      <div className="content-width">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-brand-blue mb-3 tracking-wide uppercase">
              수강 신청
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
              무료로 등록하고
              <br />
              강의 콘텐츠 바로 받기
            </h2>
            <p className="text-brand-gray">
              등록 즉시 강의 영상·전자책을 제공하고, 카카오 알림톡을 보내드려요.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-brand-light rounded-2xl p-6 sm:p-8 border border-gray-100"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          >
            <div className="space-y-5">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-1.5">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-1.5">
                  연락처 (휴대폰) <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                  }
                  maxLength={13}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                />
                <p className="text-xs text-brand-gray mt-1">알림톡 수신 번호입니다.</p>
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1.5">
                  이메일 <span className="text-gray-400 font-normal">(선택)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                />
              </div>

              {/* 관심 강의 */}
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-3">
                  관심 강의 선택 <span className="text-red-500">*</span>
                  <span className="text-brand-gray font-normal ml-1">(복수 선택 가능)</span>
                </label>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.selectedCourses.includes(course.id)
                          ? "border-brand-blue bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                        checked={formData.selectedCourses.includes(course.id)}
                        onChange={() => handleCourseToggle(course.id)}
                      />
                      <span className="text-lg">{course.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-brand-dark leading-tight">
                          {course.title}
                        </div>
                        <div className="text-xs text-brand-gray mt-0.5">{course.subtitle}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {course.is_paid && (
                          <span className="text-xs text-orange-600 font-medium">{course.price}</span>
                        )}
                        {course.badge && (
                          <span className="text-xs font-bold text-brand-blue bg-blue-100 px-1.5 py-0.5 rounded">
                            {course.badge}
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {status === "error" && errorMessage && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  <AlertCircle size={16} className="shrink-0" />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 text-base font-semibold text-white bg-brand-blue rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    등록 중...
                  </>
                ) : (
                  "무료 등록하고 강의 받기"
                )}
              </button>

              <p className="text-xs text-center text-brand-gray">
                개인정보는 강의 안내 목적으로만 사용되며, 제3자에게 제공되지 않습니다.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
