import { News } from '@/domain/news/News';
import { fetchNewsFromAPI } from '@/infrastructure/NewsAPI';
import NewsItem from '@/src/ui/components/NewsItem';
import { registerNewsBackgroundTask } from '@/tasks/BackgroundNewsTask';
import { getStoredNews, storeNews } from '@/utils/storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, View } from 'react-native';


export default function HomePage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    registerNewsBackgroundTask();
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const latest = await fetchNewsFromAPI();
      setNews(latest);
      await storeNews(latest);
    } catch {
      const offline = await getStoredNews();
      setNews(offline);
      Alert.alert("Çevrimdışı veri yüklendi.");
    }
    setLoading(false);
  };


  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Son Haberler" }} />
      {loading ? <ActivityIndicator size="large" style={{ marginTop: 50 }} /> :
        <FlatList
          data={news}
          renderItem={({ item, index }) => (
            <NewsItem
              item={item}
              onPress={() => router.push({ pathname: "/news/[id]", params: { id: item.id } })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadNews} />}
        />}
    </View>
  );
}