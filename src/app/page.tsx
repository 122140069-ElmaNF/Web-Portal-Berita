import Link from "next/link";
import Image from "next/image";
import { fetchNews, NewsArticle } from "@/app/lib/fetchNews";

export default async function Home() {
  const news: NewsArticle[] = await fetchNews();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Berita Utama</h1>
      
      {news.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-center text-gray-500">Tidak ada berita yang tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item: NewsArticle, index: number) => (
            <Link href={`/news/${index}`} key={index} className="block">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="mt-2 text-lg font-semibold line-clamp-2">{item.title}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium text-blue-600">{item.source}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}