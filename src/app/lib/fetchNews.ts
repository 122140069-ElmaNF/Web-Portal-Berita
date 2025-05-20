import axios from 'axios';
export const revalidate = 3600;

export interface NewsArticle {
  title: string;
  image: string;
  source: string;
  content: string;
  url: string;
  publishedAt: string;
  author: string;
}

// Definisikan tipe respons API untuk masing-masing sumber berita
interface NewsAPIResponse {
  articles: Array<{
    title?: string;
    urlToImage?: string;
    source?: { name?: string };
    content?: string;
    url: string;
    publishedAt?: string;
    author?: string;
  }>;
}

interface NYTimesResponse {
  results: Array<{
    title?: string;
    multimedia?: Array<{ url?: string }>;
    abstract?: string;
    url: string;
    published_date?: string;
    byline?: string;
  }>;
}

interface GuardianResponse {
  response: {
    results: Array<{
      webTitle?: string;
      fields?: {
        thumbnail?: string;
        body?: string;
        byline?: string;
      };
      webUrl: string;
      webPublicationDate?: string;
    }>;
  };
}

export async function fetchNews(): Promise<NewsArticle[]> {
  const apiKeyNewsAPI = process.env.NEWSAPI_KEY;
  const apiKeyNYTimes = process.env.NY_TIMES_API_KEY;
  const apiKeyGuardian = process.env.GUARDIAN_API_KEY;

  if (!apiKeyNewsAPI || !apiKeyNYTimes || !apiKeyGuardian) {
    console.error('Missing API key(s)');
    return [];
  }

  const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKeyNewsAPI}`;
  const nyTimesUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKeyNYTimes}`;
  const guardianUrl = `https://content.guardianapis.com/search?api-key=${apiKeyGuardian}&show-fields=thumbnail,body,byline`;

  console.log(newsApiUrl);
  console.log(nyTimesUrl);
  console.log(guardianUrl);

  try {
    // Menambahkan tipe untuk respons dari API calls
    const [newsResponse, nyTimesResponse, guardianResponse] = await Promise.all([
      axios.get<NewsAPIResponse>(newsApiUrl),
      axios.get<NYTimesResponse>(nyTimesUrl),
      axios.get<GuardianResponse>(guardianUrl),
    ]);
    console.log (newsResponse.data)

    const newsArticles: NewsArticle[] = newsResponse.data.articles.map((article) => ({
      title: article.title || 'No Title',
      image: article.urlToImage || 'https://via.placeholder.com/150',
      source: article.source?.name || 'Unknown Source',
      content: article.content || 'No Content',
      url: article.url,
      publishedAt: article.publishedAt || 'Unknown Date',
      author: article.author || 'Unknown Author',
    }));

    const nyTimesArticles: NewsArticle[] = nyTimesResponse.data.results.map((article) => ({
      title: article.title || 'No Title',
      image: article.multimedia?.[0]?.url || 'https://via.placeholder.com/150',
      source: 'NY Times',
      content: article.abstract || 'No Content',
      url: article.url,
      publishedAt: article.published_date || 'Unknown Date',
      author: article.byline || 'Unknown Author',
    }));

    const guardianArticles: NewsArticle[] = guardianResponse.data.response.results.map((article) => ({
      title: article.webTitle || 'No Title',
      image: article.fields?.thumbnail || 'https://via.placeholder.com/150',
      source: 'The Guardian',
      content: article.fields?.body || 'No Content',
      url: article.webUrl,
      publishedAt: article.webPublicationDate || 'Unknown Date',
      author: article.fields?.byline || 'Unknown Author',
    }));

    return [...newsArticles, ...nyTimesArticles, ...guardianArticles];
  } catch (error: unknown) {
    // Gunakan tipe error sebagai unknown dan periksa propertinya dengan cara yang aman
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: unknown }, message?: string };
      console.error('Axios Error:', axiosError.response?.data || axiosError.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    return [];
  }
}