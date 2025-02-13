import type { Evaluator, IAgentRuntime, Memory, State } from '@elizaos/core';
export declare class TokenPriceEvaluator implements Evaluator {
    name: string;
    similes: string[];
    description: string;
    validate(runtime: IAgentRuntime, message: Memory): Promise<boolean>;
    handler(_runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string>;
    examples: {
        context: string;
        messages: {
            user: string;
            content: {
                text: string;
                action: string;
            };
        }[];
        outcome: string;
    }[];
}
export declare const tokenPriceEvaluator: TokenPriceEvaluator;
