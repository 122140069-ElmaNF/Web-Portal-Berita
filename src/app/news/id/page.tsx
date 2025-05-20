import { fetchNews, NewsArticle } from "@/app/lib/fetchNews";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    notFound(); // Tangani error dengan Next.js native
  }

  const news: NewsArticle = newsItems[newsIndex];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link href="/" className="text-pink-600 hover:underline block mb-6">
        ← Kembali ke daftar berita
      </Link>

      <div className="bg-white dark:bg-card-bg rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-[400px] w-full">
          <Image
            src={news.image || "https://via.placeholder.com/800x400?text=No+Image"}
            alt={news.title}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-rose-700 mb-4">{news.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">
            <span>📅 {new Date(news.publishedAt).toLocaleDateString("id-ID")}</span>
            <span>📰 {news.source}</span>
            <span>✍️ {news.author}</span>
          </div>

          <div className="prose max-w-none">
            {news.source === "The Guardian" || news.source === "NY Times" ? (
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
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            >
              Baca Artikel Lengkap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
