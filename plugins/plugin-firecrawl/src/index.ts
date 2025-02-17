// plugins/plugin-firecrawl/src/index.ts

import { Plugin } from '@elizaos/core';
import { getScrapeDataAction } from './actions/getScrapeData.ts';
import { getSearchDataAction } from './actions/getSearchData.ts';

export const firecrawlPlugin: Plugin = {
  name: 'firecrawl',
  description: 'Firecrawl Plugin for Eliza',
  actions: [getSearchDataAction, getScrapeDataAction],
  evaluators: [],
  providers: []
};
export default firecrawlPlugin;
