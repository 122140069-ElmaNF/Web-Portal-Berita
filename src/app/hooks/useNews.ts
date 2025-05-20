import { useEffect, useState } from 'react';
import { NewsArticle, fetchNews } from '@/app/lib/fetchNews';

export default function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const newsData = await fetchNews();
        setArticles(newsData);
        setError(null);
      } catch (err) {
        setError('Gagal memuat berita');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return { articles, loading, error };
}