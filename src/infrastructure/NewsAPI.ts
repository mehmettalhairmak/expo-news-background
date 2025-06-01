// /src/infrastructure/NewsAPI.ts

import axios from "axios";
import { News } from "../domain/news/News";
import { NewsService } from "../domain/news/NewsService";

const API_KEY = "e1363582ba3145f1a950fe321708dfce";
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY;

export async function fetchNewsFromAPI(): Promise<News[]> {
  const { data } = await axios.get(BASE_URL);
  if (!data || !data.articles) return [];
  return data.articles.map(NewsService.mapRawToNews);
}