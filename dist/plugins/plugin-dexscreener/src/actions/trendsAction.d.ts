import { type Action, type HandlerCallback, type IAgentRuntime, type Memory, type State } from '@elizaos/core';
export declare const latestTokensTemplate = "Determine if this is a request for latest tokens. If it is one of the specified situations, perform the corresponding action:\n\nSituation 1: \"Get latest tokens\"\n- Message contains: words like \"latest\", \"new\", \"recent\" AND \"tokens\"\n- Example: \"Show me the latest tokens\" or \"What are the new tokens?\"\n- Action: Get the most recent tokens listed\n\nPrevious conversation for context:\n{{conversation}}\n\nYou are replying to: {{message}}\n";
export declare class LatestTokensAction implements Action {
    name: string;
    similes: string[];
    description: string;
    suppressInitialMessage: boolean;
    template: string;
    validate(runtime: IAgentRuntime, message: Memory): Promise<boolean>;
    handler(runtime: IAgentRuntime, message: Memory, state?: State, _options?: {
        [key: string]: unknown;
    }, callback?: HandlerCallback): Promise<boolean>;
    examples: ({
        user: string;
        content: {
            text: string;
            action?: undefined;
        };
    } | {
        user: string;
        content: {
            text: string;
            action: string;
        };
    })[][];
}
export declare const latestBoostedTemplate = "Determine if this is a request for latest boosted tokens. If it is one of the specified situations, perform the corresponding action:\n\nSituation 1: \"Get latest boosted tokens\"\n- Message contains: words like \"latest\", \"new\", \"recent\" AND \"boosted tokens\"\n- Example: \"Show me the latest boosted tokens\" or \"What are the new promoted tokens?\"\n- Action: Get the most recent boosted tokens\n\nPrevious conversation for context:\n{{conversation}}\n\nYou are replying to: {{message}}\n";
export declare class LatestBoostedTokensAction implements Action {
    name: string;
    similes: string[];
    description: string;
    suppressInitialMessage: boolean;
    template: string;
    validate(runtime: IAgentRuntime, message: Memory): Promise<boolean>;
    handler(runtime: IAgentRuntime, message: Memory, state?: State, _options?: {
        [key: string]: unknown;
    }, callback?: HandlerCallback): Promise<boolean>;
    examples: ({
        user: string;
        content: {
            text: string;
            action?: undefined;
        };
    } | {
        user: string;
        content: {
            text: string;
            action: string;
        };
    })[][];
}
export declare const topBoostedTemplate = "Determine if this is a request for top boosted tokens. If it is one of the specified situations, perform the corresponding action:\n\nSituation 1: \"Get top boosted tokens\"\n- Message contains: words like \"top\", \"best\", \"most\" AND \"boosted tokens\"\n- Example: \"Show me the top boosted tokens\" or \"What are the most promoted tokens?\"\n- Action: Get the tokens with most active boosts\n\nPrevious conversation for context:\n{{conversation}}\n\nYou are replying to: {{message}}\n";
export declare class TopBoostedTokensAction implements Action {
    name: string;
    similes: string[];
    description: string;
    suppressInitialMessage: boolean;
    template: string;
    validate(runtime: IAgentRuntime, message: Memory): Promise<boolean>;
    handler(runtime: IAgentRuntime, message: Memory, state?: State, _options?: {
        [key: string]: unknown;
    }, callback?: HandlerCallback): Promise<boolean>;
    examples: ({
        user: string;
        content: {
            text: string;
            action?: undefined;
        };
    } | {
        user: string;
        content: {
            text: string;
            action: string;
        };
    })[][];
}
export declare const latestTokensAction: LatestTokensAction;
export declare const latestBoostedTokensAction: LatestBoostedTokensAction;
export declare const topBoostedTokensAction: TopBoostedTokensAction;
