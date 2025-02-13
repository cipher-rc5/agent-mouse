import { type IAgentRuntime, Service, ServiceType } from '@elizaos/core';
import { tavily } from '@tavily/core';
import type { IWebSearchService, SearchOptions, SearchResponse } from '../types.ts';
export type TavilyClient = ReturnType<typeof tavily>;
export declare class WebSearchService extends Service implements IWebSearchService {
    tavilyClient: TavilyClient;
    initialize(_runtime: IAgentRuntime): Promise<void>;
    getInstance(): IWebSearchService;
    static get serviceType(): ServiceType;
    search(query: string, options?: SearchOptions): Promise<SearchResponse>;
}
