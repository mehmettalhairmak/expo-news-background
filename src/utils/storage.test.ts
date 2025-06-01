import { News } from '@/domain/news/News';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredNews, storeNews } from './storage';

describe('storage utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('storeNews should serialize and save news array', async () => {
    const news: News[] = [
      { id: '1', title: 'Haber 1', description: '', url: '', publishedAt: '2025-06-01' }
    ];
    await storeNews(news);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('news', JSON.stringify(news));
  });

  it('getStoredNews should deserialize and return news array', async () => {
    const fakeNews: News[] = [
      { id: '1', title: 'Haber 1', description: '', url: '', publishedAt: '2025-06-01' }
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(fakeNews));
    const result = await getStoredNews();
    expect(result).toEqual(fakeNews);
  });

  it('getStoredNews returns empty array if no data', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const result = await getStoredNews();
    expect(result).toEqual([]);
  });
});