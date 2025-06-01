import { News } from '@/domain/news/News';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import NewsItem from './NewsItem';

describe('NewsItem', () => {
  const mockItem: News = {
    id: '1',
    title: 'Test Başlık',
    description: 'Test Açıklama',
    url: 'https://test.com',
    publishedAt: '2025-06-01',
    urlToImage: 'https://test.com/img.jpg',
  };

  it('başlık ve açıklama gösteriliyor', () => {
    const { getByText } = render(<NewsItem item={mockItem} onPress={() => {}} />);
    expect(getByText('Test Başlık')).toBeTruthy();
    expect(getByText('Test Açıklama')).toBeTruthy();
  });

  it('basınca onPress tetikleniyor', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<NewsItem item={mockItem} onPress={onPress} />);
    fireEvent.press(getByTestId('news-item'));
    expect(onPress).toHaveBeenCalled();
  });
});