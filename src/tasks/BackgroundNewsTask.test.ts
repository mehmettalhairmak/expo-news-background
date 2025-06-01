import * as NewsAPI from '@/infrastructure/NewsAPI';
import * as BackgroundTask from 'expo-background-task';
import * as storage from '../utils/storage';
import { backgroundNewsTask } from './BackgroundNewsTask';

jest.mock('@/infrastructure/NewsAPI');
jest.mock('../utils/storage');
jest.mock('expo-background-task', () => ({
  BackgroundTaskResult: {
    Success: 'success',
    Failed: 'failed',
  },
}));

describe('backgroundNewsTask', () => {
  it('If fetchNewsFromAPI is successful, it returns Success', async () => {
    (NewsAPI.fetchNewsFromAPI as jest.Mock).mockResolvedValueOnce([{ id: '1', title: '', description: '', url: '', publishedAt: '' }]);
    (storage.storeNews as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await backgroundNewsTask();
    expect(result).toBe(BackgroundTask.BackgroundTaskResult.Success);
  });

  it('If fetchNewsFromAPI throws an error, it returns Failed', async () => {
    (NewsAPI.fetchNewsFromAPI as jest.Mock).mockRejectedValueOnce(new Error());
    const result = await backgroundNewsTask();
    expect(result).toBe(BackgroundTask.BackgroundTaskResult.Failed);
  });

  it('If storeNews throws an error, it returns Failed', async () => {
    (NewsAPI.fetchNewsFromAPI as jest.Mock).mockResolvedValueOnce([{ id: '1', title: '', description: '', url: '', publishedAt: '' }]);
    (storage.storeNews as jest.Mock).mockRejectedValueOnce(new Error());
    const result = await backgroundNewsTask();
    expect(result).toBe(BackgroundTask.BackgroundTaskResult.Failed);
  });
});