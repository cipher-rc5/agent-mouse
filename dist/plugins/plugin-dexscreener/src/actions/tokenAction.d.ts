import type { Action, HandlerCallback, IAgentRuntime, Memory, State } from '@elizaos/core';
export declare const priceTemplate = "Determine if this is a token price request. If it is one of the specified situations, perform the corresponding action:\n\nSituation 1: \"Get token price\"\n- Message contains: words like \"price\", \"value\", \"cost\", \"worth\" AND a token symbol/address\n- Example: \"What's the price of ETH?\" or \"How much is BTC worth?\"\n- Action: Get the current price of the token\n\nPrevious conversation for context:\n{{conversation}}\n\nYou are replying to: {{message}}\n";
export declare class TokenPriceAction implements Action {
    name: string;
    similes: string[];
    description: string;
    suppressInitialMessage: boolean;
    template: string;
    validate(_runtime: IAgentRuntime, message: Memory): Promise<boolean>;
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
export declare const tokenPriceAction: TokenPriceAction;
