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
      <header className="space-y-10 mb-20 text-center">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {postData.tags?.map(tag => (
              <span key={tag} className="text-sm font-bold text-toss-blue bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-toss-gray-dark dark:text-white leading-[1.25] tracking-tight">
            {postData.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-toss-gray-medium dark:text-toss-gray-light">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-toss-blue flex items-center justify-center text-white text-sm font-bold shadow-sm">TJ</div>
              <span className="font-bold text-toss-gray-dark dark:text-white">한태준</span>
            </div>
            <span className="w-1.5 h-1.5 bg-toss-border dark:bg-[#222222] rounded-full"></span>
            <time className="text-base font-medium" dateTime={postData.date}>
              {postData.date}
            </time>
          </div>
        </div>
      </header>

      <article className="prose dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      <footer className="mt-32 pt-16 border-t border-toss-border dark:border-[#222222]">
        <div className="bg-toss-bg-sub dark:bg-[#1a1a1a] rounded-[40px] p-12 flex flex-col sm:flex-row items-center sm:items-start gap-10">
          <div className="h-24 w-24 flex-shrink-0 rounded-full bg-toss-blue flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-blue-500/20">
            TJ
          </div>
          <div className="space-y-5 text-center sm:text-left">
            <div>
              <h4 className="text-2xl font-bold text-toss-gray-dark dark:text-white">한태준</h4>
              <p className="text-toss-blue font-bold text-base mt-1">Frontend Engineer</p>
            </div>
            <p className="text-toss-gray-medium dark:text-toss-gray-light leading-relaxed text-lg">
              사용자가 사랑하는 프로덕트를 만드는 것에 가치를 둡니다. 
              기술적인 깊이와 더불어 최고의 사용자 경험을 고민하며 기록하고 있습니다.
            </p>
            <div className="flex justify-center sm:justify-start gap-6 pt-2">
              <Link href="#" className="text-base font-bold text-toss-gray-medium dark:text-toss-gray-light hover:text-toss-blue transition-colors">GitHub</Link>
              <Link href="#" className="text-base font-bold text-toss-gray-medium dark:text-toss-gray-light hover:text-toss-blue transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-toss-blue text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </footer>
    </div>
  );
}
