import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TJ.HAN tech 블로그",
  description: "기술적인 깊이와 사용자 경험을 고민하는 개발자 한태준의 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md border-b border-toss-border dark:border-[#222222]">
          <nav className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-toss-gray-dark dark:text-white hover:opacity-80 transition-opacity">
              TJ.HAN tech 블로그
            </Link>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-toss-bg-sub dark:hover:bg-white/10 rounded-lg transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-toss-gray-medium dark:text-toss-gray-light group-hover:text-toss-blue">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </button>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12 min-h-[calc(100vh-160px)]">
          {children}
        </main>

        <footer className="border-t border-toss-border dark:border-[#222222] bg-white dark:bg-[#111111] py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col gap-6">
              <div className="flex gap-8 text-sm font-semibold text-toss-gray-medium dark:text-toss-gray-light">
                <Link href="/" className="hover:text-toss-blue transition-colors">홈</Link>
                <Link href="#" className="hover:text-toss-blue transition-colors">기술</Link>
                <Link href="#" className="hover:text-toss-blue transition-colors">팀</Link>
              </div>
              <p className="text-sm text-toss-gray-light dark:text-toss-gray-medium">
                © {new Date().getFullYear()} TJ.Han. All rights reserved. 
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> | </span>
                본 블로그의 모든 콘텐츠는 저작권법의 보호를 받습니다.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
