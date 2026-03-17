import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">내 정적 블로그</h1>
          <p className="text-xl text-gray-600">Vercel에 배포하는 Next.js 블로그</p>
        </header>

        <main>
          <ul className="space-y-8">
            {allPostsData.map(({ id, date, title, description }) => (
              <li key={id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Link href={`/${id}`}>
                  <h2 className="text-2xl font-bold text-blue-600 hover:text-blue-800 mb-2">
                    {title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 mb-4">{date}</p>
                <p className="text-gray-700">{description}</p>
                <Link 
                  href={`/${id}`}
                  className="inline-block mt-4 text-sm font-medium text-blue-500 hover:text-blue-700"
                >
                  더 보기 →
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
