import { News, RawNews } from './News';

export class NewsService {
  // Map raw news to domain news
  static mapRawToNews(raw: RawNews): News {
    if (!raw.title || !raw.url) throw new Error("Invalid news object");
    return {
      id: raw.url, // URL unique id
      title: raw.title,
      description: raw.description ?? "",
      url: raw.url,
      urlToImage: raw.urlToImage,
      publishedAt: raw.publishedAt ?? "",
    };
  }

  // Filter news by today
  static filterToday(newsList: News[], today: string): News[] {
    return newsList.filter(item => item.publishedAt.startsWith(today));
  }
}