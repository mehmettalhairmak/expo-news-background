import { News } from '@/domain/news/News';
import { getStoredNews } from '@/utils/storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Image, Linking, ScrollView, StyleSheet, Text } from 'react-native';

export default function NewsDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allNews = await getStoredNews();
      setNews(allNews[Number(id)]);
    })();
  }, [id]);

  if (!news) return <Text>Yükleniyor...</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Stack.Screen options={{ title: news.title?.slice(0, 32) + "..." }} />
      {news.urlToImage && <Image source={{ uri: news.urlToImage }} style={styles.img} />}
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.desc}>{news.description}</Text>
      <Button title="Habere Git" onPress={() => Linking.openURL(news.url)} />
      <Button title="Geri" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: { height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
  desc: { fontSize: 15, marginBottom: 20 }
});