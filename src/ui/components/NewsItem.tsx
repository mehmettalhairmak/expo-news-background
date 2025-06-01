import { News } from '@/domain/news/News';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  item: News;
  onPress: () => void;
};

export default function NewsItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} testID="news-item">
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.img} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10, backgroundColor: "#fff", borderRadius: 10, padding: 10, elevation: 2 },
  img: { height: 140, borderRadius: 10, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  desc: { color: '#666', marginTop: 5 }
});