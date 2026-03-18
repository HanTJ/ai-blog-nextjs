import { getPostData, getAllPostIds } from '@/lib/posts';
import Link from 'next/link';

export const dynamicParams = false;

// 1. 빌드 타임에 생성할 마크다운 파일들의 경로(slug)를 미리 정의합니다.
export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({
    slug: post.params.slug,
  }));
}

// 2. 개별 포스트 페이지 렌더링
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <header className="space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to list
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              Tech Notes
            </span>
            <time className="text-sm text-slate-400 dark:text-slate-500" dateTime={postData.date}>
              {postData.date}
            </time>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {postData.title}
          </h1>
        </div>
      </header>

      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800 prose-img:rounded-2xl">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      <footer className="pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
            D
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">DevLog Admin</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              끊임없이 배우고 기록하며, 기술로 세상을 더 나은 곳으로 만들고 싶은 개발자입니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
