import type { IAgentRuntime } from '@elizaos/core';
import { z } from 'zod';
export declare const stargazeEnvSchema: z.ZodObject<{
    STARGAZE_ENDPOINT: z.ZodString;
}, "strip", z.ZodTypeAny, {
    STARGAZE_ENDPOINT?: string;
}, {
    STARGAZE_ENDPOINT?: string;
}>;
export type StargazeConfig = z.infer<typeof stargazeEnvSchema>;
export declare function validateStargazeConfig(runtime: IAgentRuntime): Promise<StargazeConfig>;
