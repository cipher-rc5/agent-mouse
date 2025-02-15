import { ScrapeResponse, SearchResponse } from './types.ts';
export declare const createFirecrawlService: (apiKey: string) => {
    getSearchData: (query: string) => Promise<SearchResponse>;
    getScrapeData: (url: string) => Promise<ScrapeResponse>;
};
