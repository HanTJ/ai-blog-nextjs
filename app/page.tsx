import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Insights for <span className="text-blue-500">Developers</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          최신 기술 트렌드, 아키텍처, 그리고 효율적인 엔지니어링 경험을 공유합니다.
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Posts</h2>
          <span className="text-sm text-slate-500">{allPostsData.length} articles</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allPostsData.map(({ id, date, title, description }) => (
            <article 
              key={id} 
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  Article
                </span>
                <time className="text-xs text-slate-400 dark:text-slate-500" dateTime={date}>
                  {date}
                </time>
              </div>
              
              <Link href={`/${id}`} className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors mb-3">
                  {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed mb-6">
                  {description}
                </p>
              </Link>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                <Link 
                  href={`/${id}`}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 inline-flex items-center gap-1 group/link"
                >
                  Read full story
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="2.5" 
                    strokeLinecap="round" strokeLinejoin="round" 
                    className="group-hover/link:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
