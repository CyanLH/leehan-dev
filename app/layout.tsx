import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이한 | Frontend Engineer",
  description:
    "6년 이상 React·Next.js 기반 웹 서비스를 설계하고 개발·운영한 프론트엔드 개발자 이한의 포트폴리오. 제품 개발, 성능 최적화, 프론트엔드 아키텍처와 서비스 운영.",
  openGraph: {
    title: "LEEHAN — Frontend Engineer",
    description: "복잡한 웹 서비스를 설계하고, 빠르게 만들고, 오래 운영합니다.",
    locale: "ko_KR",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
