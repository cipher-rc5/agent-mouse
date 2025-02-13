import type { IAgentRuntime } from '@elizaos/core';
import { z } from 'zod';
export declare const imageGenEnvSchema: z.ZodEffects<z.ZodObject<{
    ANTHROPIC_API_KEY: z.ZodOptional<z.ZodString>;
    NINETEEN_AI_API_KEY: z.ZodOptional<z.ZodString>;
    TOGETHER_API_KEY: z.ZodOptional<z.ZodString>;
    HEURIST_API_KEY: z.ZodOptional<z.ZodString>;
    FAL_API_KEY: z.ZodOptional<z.ZodString>;
    OPENAI_API_KEY: z.ZodOptional<z.ZodString>;
    VENICE_API_KEY: z.ZodOptional<z.ZodString>;
    LIVEPEER_GATEWAY_URL: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ANTHROPIC_API_KEY?: string;
    NINETEEN_AI_API_KEY?: string;
    TOGETHER_API_KEY?: string;
    HEURIST_API_KEY?: string;
    FAL_API_KEY?: string;
    OPENAI_API_KEY?: string;
    VENICE_API_KEY?: string;
    LIVEPEER_GATEWAY_URL?: string;
}, {
    ANTHROPIC_API_KEY?: string;
    NINETEEN_AI_API_KEY?: string;
    TOGETHER_API_KEY?: string;
    HEURIST_API_KEY?: string;
    FAL_API_KEY?: string;
    OPENAI_API_KEY?: string;
    VENICE_API_KEY?: string;
    LIVEPEER_GATEWAY_URL?: string;
}>, {
    ANTHROPIC_API_KEY?: string;
    NINETEEN_AI_API_KEY?: string;
    TOGETHER_API_KEY?: string;
    HEURIST_API_KEY?: string;
    FAL_API_KEY?: string;
    OPENAI_API_KEY?: string;
    VENICE_API_KEY?: string;
    LIVEPEER_GATEWAY_URL?: string;
}, {
    ANTHROPIC_API_KEY?: string;
    NINETEEN_AI_API_KEY?: string;
    TOGETHER_API_KEY?: string;
    HEURIST_API_KEY?: string;
    FAL_API_KEY?: string;
    OPENAI_API_KEY?: string;
    VENICE_API_KEY?: string;
    LIVEPEER_GATEWAY_URL?: string;
}>;
export type ImageGenConfig = z.infer<typeof imageGenEnvSchema>;
export declare function validateImageGenConfig(runtime: IAgentRuntime): Promise<ImageGenConfig>;
