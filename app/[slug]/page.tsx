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
    <div className="max-w-3xl mx-auto py-12">
      <header className="space-y-8 mb-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-base font-semibold text-toss-blue hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          전체 목록
        </Link>
        
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-toss-gray-dark dark:text-white leading-[1.3] tracking-tight">
            {postData.title}
          </h1>
          
          <div className="flex items-center gap-4 text-toss-gray-medium dark:text-toss-gray-light">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-toss-blue flex items-center justify-center text-white text-xs font-bold">TJ</div>
              <span className="font-semibold text-toss-gray-dark dark:text-white">한태준</span>
            </div>
            <span className="w-1 h-1 bg-toss-border dark:bg-[#222222] rounded-full"></span>
            <time className="text-sm font-medium" dateTime={postData.date}>
              {postData.date}
            </time>
          </div>
        </div>
      </header>

      <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
        prose-headings:text-toss-gray-dark dark:prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
        prose-p:text-toss-gray-medium dark:prose-p:text-toss-gray-light prose-p:leading-[1.7]
        prose-strong:text-toss-gray-dark dark:prose-strong:text-white
        prose-a:text-toss-blue hover:prose-a:opacity-80
        prose-pre:bg-[#1a1b26] dark:prose-pre:bg-[#111111] prose-pre:rounded-2xl prose-pre:p-6
        prose-code:text-toss-blue dark:prose-code:text-toss-blue prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-2xl"
      >
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      <footer className="mt-24 pt-16 border-t border-toss-border dark:border-[#222222]">
        <div className="bg-toss-bg-sub dark:bg-[#1a1a1a] rounded-[32px] p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="h-20 w-20 flex-shrink-0 rounded-full bg-toss-blue flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20">
            TJ
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h4 className="text-xl font-bold text-toss-gray-dark dark:text-white">한태준</h4>
              <p className="text-toss-blue font-semibold text-sm">Frontend Engineer</p>
            </div>
            <p className="text-toss-gray-medium dark:text-toss-gray-light leading-relaxed">
              사용자가 사랑하는 프로덕트를 만드는 것에 가치를 둡니다. 
              기술적인 깊이와 더불어 최고의 사용자 경험을 고민하며 기록하고 있습니다.
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <Link href="#" className="text-sm font-bold text-toss-gray-medium dark:text-toss-gray-light hover:text-toss-blue transition-colors">GitHub</Link>
              <Link href="#" className="text-sm font-bold text-toss-gray-medium dark:text-toss-gray-light hover:text-toss-blue transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
