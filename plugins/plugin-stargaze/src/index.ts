// plugins/plugin-stargaze/src/index.ts

import type { Plugin } from '@elizaos/core';
import getCollectionStats from './actions/getCollectionStats.ts';
import getLatestNFT from './actions/getLatestNFT.ts';
import getTokenSales from './actions/getTokenSales.ts';

export const stargazePlugin: Plugin = {
  name: 'stargaze',
  description: 'Stargaze NFT Plugin for Eliza',
  actions: [getLatestNFT, getCollectionStats, getTokenSales],
  evaluators: [],
  providers: []
};

export default stargazePlugin;
