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
  title: "DevLog | 기술 블로그",
  description: "최신 기술 트렌드와 개발 경험을 공유하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100`}
      >
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-blue-500 transition-colors">
              DevLog<span className="text-blue-500">.</span>
            </Link>
            <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-blue-500 transition-colors">Posts</Link>
              <Link href="#" className="hover:text-blue-500 transition-colors">About</Link>
            </div>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-12 min-h-[calc(100vh-128px)]">
          {children}
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} DevLog. Built with Next.js & Tailwind CSS.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
