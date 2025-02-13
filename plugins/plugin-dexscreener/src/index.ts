import type { Plugin } from '@elizaos/core';
import { TokenPriceAction } from './actions/tokenAction.ts';
import { LatestBoostedTokensAction, LatestTokensAction, TopBoostedTokensAction } from './actions/trendsAction.ts';
import { TokenPriceEvaluator } from './evaluators/tokenEvaluator.ts';
import { TokenPriceProvider } from './providers/tokenProvider.ts';

// Export individual components
export { TokenPriceAction } from './actions/tokenAction.ts';
export { LatestBoostedTokensAction, LatestTokensAction, TopBoostedTokensAction } from './actions/trendsAction.ts';
export { TokenPriceEvaluator } from './evaluators/tokenEvaluator.ts';
export { TokenPriceProvider } from './providers/tokenProvider.ts';

export const dexScreenerPlugin: Plugin = {
  name: 'dexscreener',
  description: 'Dex Screener Plugin with Token Price Action, Token Trends, Evaluators and Providers',
  actions: [
    new TokenPriceAction(),
    new LatestTokensAction(),
    new LatestBoostedTokensAction(),
    new TopBoostedTokensAction()
  ],
  evaluators: [new TokenPriceEvaluator()],
  providers: [new TokenPriceProvider()]
};
