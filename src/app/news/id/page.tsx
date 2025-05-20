import { fetchNews, NewsArticle } from "@/app/lib/fetchNews";
import Image from "next/image";
import Link from "next/link";

// Generate dynamic params berdasarkan jumlah berita
export async function generateStaticParams() {
  const news = await fetchNews();
  return news.map((_, index) => ({
    id: index.toString(),
  }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const newsItems = await fetchNews();
  const newsIndex = parseInt(params.id);
  
  if (isNaN(newsIndex) || newsIndex < 0 || newsIndex >= newsItems.length) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">Berita tidak ditemukan.</p>
        </div>
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Kembali ke daftar berita
        </Link>
      </div>
    );
  }

  const news: NewsArticle = newsItems[newsIndex];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link href="/" className="text-blue-600 hover:underline block mb-6">
        &larr; Kembali ke daftar berita
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[400px] w-full">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(news.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>{news.source}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{news.author}</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            {/* Render content sebagai HTML jika dari Guardian/The NY Times */}
            {news.source === 'The Guardian' || news.source === 'NY Times' ? (
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            ) : (
              <p>{news.content}</p>
            )}
          </div>
          
          <div className="mt-8 pt-4 border-t">
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Baca Artikel Lengkap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}