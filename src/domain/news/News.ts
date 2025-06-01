export interface RawNews {
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
}

export interface News {
    id: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
}