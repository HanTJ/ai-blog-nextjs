import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const allPostsData = getSortedPostsData();
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const searchQuery = params.search || '';
  
  // 검색 필터링
  const filteredPosts = searchQuery
    ? allPostsData.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allPostsData;

  // 페이지네이션 (4개씩)
  const postsPerPage = 4;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between mb-8 border-b border-toss-border dark:border-[#222222] pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-toss-gray-dark dark:text-white">
          전체 아티클
        </h1>
        <span className="text-sm font-medium text-toss-gray-light dark:text-toss-gray-medium">
          총 {filteredPosts.length}개
        </span>
      </div>

      <div className="divide-y divide-toss-border dark:divide-[#222222]">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(({ id, date, title, description, tags }) => (
            <article key={id} className="py-12 group">
              <Link href={`/${id}`} className="block space-y-4">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-toss-gray-dark dark:text-white group-hover:text-toss-blue transition-colors leading-tight">
                    {title}
                  </h2>
                  <p className="text-lg text-toss-gray-medium dark:text-toss-gray-light line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <time className="text-sm text-toss-gray-light dark:text-toss-gray-medium font-medium pr-2 border-r border-toss-border dark:border-[#222222]">
                    {date}
                  </time>
                  {tags?.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-sm font-semibold text-toss-blue bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full transition-all group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-toss-gray-medium dark:text-toss-gray-light text-lg">
              검색 결과가 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-12">
          {currentPage > 1 && (
            <Link 
              href={`/?page=${currentPage - 1}`}
              className="px-4 py-2 text-sm font-bold text-toss-gray-medium dark:text-toss-gray-light hover:bg-toss-bg-sub dark:hover:bg-white/10 rounded-lg transition-colors border border-toss-border dark:border-[#222222]"
            >
              이전
            </Link>
          )}
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/?page=${pageNum}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  pageNum === currentPage
                    ? "bg-toss-blue text-white shadow-lg shadow-blue-500/30"
                    : "text-toss-gray-medium dark:text-toss-gray-light hover:bg-toss-bg-sub dark:hover:bg-white/10"
                }`}
              >
                {pageNum}
              </Link>
            ))}
          </div>

          {currentPage < totalPages && (
            <Link 
              href={`/?page=${currentPage + 1}`}
              className="px-4 py-2 text-sm font-bold text-toss-gray-medium dark:text-toss-gray-light hover:bg-toss-bg-sub dark:hover:bg-white/10 rounded-lg transition-colors border border-toss-border dark:border-[#222222]"
            >
              다음
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
