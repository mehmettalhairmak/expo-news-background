import { News } from '@/domain/news/News';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeNews = async (news: News[]) =>
  AsyncStorage.setItem('news', JSON.stringify(news));

export const getStoredNews = async (): Promise<News[]> => {
  const val = await AsyncStorage.getItem('news');
  return val ? JSON.parse(val) : [];
};