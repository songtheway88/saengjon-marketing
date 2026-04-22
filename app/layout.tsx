import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "생존마케팅 AI 강의",
  description:
    "노트북LM, 제미나이, 클로드, Vrew까지. 혼자서도 할 수 있는 AI 콘텐츠 자동화 강의",
  openGraph: {
    title: "생존마케팅 AI 강의",
    description:
      "노트북LM, 제미나이, 클로드, Vrew까지. 혼자서도 할 수 있는 AI 콘텐츠 자동화 강의",
    url: "https://viralers.io",
    siteName: "생존마케팅",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "생존마케팅 AI 강의",
    description:
      "노트북LM, 제미나이, 클로드, Vrew까지. 혼자서도 할 수 있는 AI 콘텐츠 자동화 강의",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
