import type { IAgentRuntime, Memory, Provider, State } from '@elizaos/core';
export declare class TokenPriceProvider implements Provider {
    get(runtime: IAgentRuntime, message: Memory, _state?: State): Promise<string>;
    private extractToken;
    private getBestPair;
    private formatPriceData;
}
export declare const tokenPriceProvider: TokenPriceProvider;
