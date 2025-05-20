import { fetchNews } from "../lib/fetchNews";
import { NewsArticle } from "../lib/fetchNews";

export default async function Page() {
  const news: NewsArticle[] = await fetchNews();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Portal Berita</h1>
      <div>
        {news.map((article, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.source} - {new Date(article.publishedAt).toLocaleString()}</p>
            <img src={article.image} alt="news" className="w-full h-auto" />
            <p>{article.content}</p>
            <a href={article.url} target="_blank" className="text-blue-500">Baca selengkapnya</a>
          </div>
        ))}
      </div>
    </div>
  );
}
