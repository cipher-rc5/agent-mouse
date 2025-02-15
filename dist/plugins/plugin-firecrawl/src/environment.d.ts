import { IAgentRuntime } from '@elizaos/core';
import { z } from 'zod';
export declare const firecrawlEnvSchema: z.ZodObject<{
    FIRECRAWL_API_KEY: z.ZodString;
}, "strip", z.ZodTypeAny, {
    FIRECRAWL_API_KEY?: string;
}, {
    FIRECRAWL_API_KEY?: string;
}>;
export type firecrawlConfig = z.infer<typeof firecrawlEnvSchema>;
export declare function validateFirecrawlConfig(runtime: IAgentRuntime): Promise<firecrawlConfig>;
