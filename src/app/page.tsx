import Link from "next/link";
import Image from "next/image";
import { fetchNews, NewsArticle } from "@/app/lib/fetchNews";

export default async function Home() {
  const news: NewsArticle[] = await fetchNews();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
        Daftar Berita Utama
      </h1>

      {news.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-center text-gray-500">
            Tidak ada berita yang tersedia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item: NewsArticle, index: number) => {
            const formattedDate = new Date(item.publishedAt).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <Link
                href={{
                  pathname: `/news/${index}`,
                }}
                key={index}
                className="block"
              >
                <div className="bg-white border border-pink-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image || "https://via.placeholder.com/400x200?text=No+Image"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-rose-800 line-clamp-2">
                      {item.title}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium text-pink-600">
                        {item.source}
                      </p>
                      <p className="text-xs text-gray-500">{formattedDate}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
