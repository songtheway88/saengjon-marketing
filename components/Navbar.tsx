"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "회사 소개", href: "/" },
    { label: "포트폴리오", href: "/#portfolio" },
    { label: "교육 안내", href: "/education" },
    { label: "수강 신청", href: "/education#signup" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="content-width">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* 로고 */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-blue tracking-tight">
              생존마케팅
            </span>
          </a>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-brand-gray hover:text-brand-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/education#signup"
              className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-700 transition-colors"
            >
              무료 등록하기
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 text-brand-gray hover:text-brand-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-2 text-sm font-medium text-brand-gray hover:text-brand-dark border-b border-gray-50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/education#signup"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 px-4 py-3 text-sm font-semibold text-white bg-brand-blue rounded-lg text-center hover:bg-blue-700 transition-colors"
              >
                무료 등록하기
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
