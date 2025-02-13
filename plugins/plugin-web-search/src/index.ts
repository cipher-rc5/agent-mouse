import type { Plugin } from '@elizaos/core';
import { webSearch } from './actions/webSearch.ts';
import { WebSearchService } from './services/webSearchService.ts';

export const webSearchPlugin: Plugin = {
  name: 'webSearch',
  description: 'Search the web and get news',
  actions: [webSearch],
  evaluators: [],
  providers: [],
  services: [new WebSearchService()],
  clients: []
};

export default webSearchPlugin;
