import { fetchNewsFromAPI } from '@/infrastructure/NewsAPI';
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { storeNews } from '../utils/storage';

export const NEWS_TASK = 'background-fetch-news';

/**
 * Core task function (testable, pure)
 */
export async function backgroundNewsTask() {
  try {
    const news = await fetchNewsFromAPI();
    await storeNews(news);
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (err) {
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
}

// 1. Define the background task (should be in global scope)
TaskManager.defineTask(NEWS_TASK, backgroundNewsTask);

// 2. Register the task (can be called anywhere)
export const registerNewsBackgroundTask = async () =>
  await BackgroundTask.registerTaskAsync(NEWS_TASK, { minimumInterval: 15 * 60 });

// 3. Unregister the task (can be called anywhere)
export const unregisterNewsBackgroundTask = async () =>
  await BackgroundTask.unregisterTaskAsync(NEWS_TASK);
