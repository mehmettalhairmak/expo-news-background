import { News, RawNews } from './News';
import { NewsService } from './NewsService';

describe('NewsService', () => {
  describe('mapRawToNews', () => {
    it('valid raw object is mapped to News', () => {
      const raw: RawNews = {
        title: "Başlık",
        description: "Açıklama",
        url: "http://haber.com/a",
        urlToImage: "http://img.com/img.png",
        publishedAt: "2025-06-01T10:00:00Z"
      };
      const news = NewsService.mapRawToNews(raw);
      expect(news.title).toBe("Başlık");
      expect(news.url).toBe("http://haber.com/a");
      expect(news.publishedAt).toBe("2025-06-01T10:00:00Z");
    });

    it('throws error if required fields missing', () => {
      expect(() => NewsService.mapRawToNews({})).toThrow("Invalid news object");
    });
  });

  describe('filterToday', () => {
    it('returns only news published today', () => {
      const today = "2025-06-01";
      const list: News[] = [
        { id: "1", title: "", description: "", url: "1", publishedAt: "2025-06-01T11:00:00Z" },
        { id: "2", title: "", description: "", url: "2", publishedAt: "2025-05-31T11:00:00Z" },
      ];
      const filtered = NewsService.filterToday(list, today);
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe("1");
    });
  });
});