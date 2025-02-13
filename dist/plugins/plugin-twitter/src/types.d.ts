import { z } from 'zod';
export interface TweetContent {
    text: string;
}
export declare const TweetSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text?: string;
}, {
    text?: string;
}>;
export declare const isTweetContent: (obj: unknown) => obj is TweetContent;
