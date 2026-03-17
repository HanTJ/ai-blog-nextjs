import { getPostData, getAllPostIds } from '@/lib/posts';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <header className="mb-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
            ← 목록으로 돌아가기
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{postData.title}</h1>
          <p className="text-gray-500 text-sm">{postData.date}</p>
        </header>

        <article className="prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </div>
  );
}
