// plugins/plugin-firecrawl/src/actions/getScrapeData.ts

import { Action, ActionExample, elizaLogger, HandlerCallback, IAgentRuntime, Memory, State } from '@elizaos/core';
import { validateFirecrawlConfig } from '../environment.ts';
import { getScrapedDataExamples } from '../examples.ts';
import { createFirecrawlService } from '../services.ts';
import { extractUrl } from '../utils.ts';

export const getScrapeDataAction: Action = {
  name: 'FIRECRAWL_GET_SCRAPED_DATA',
  similes: [
    'SCRAPE_WEBSITE',
    'LOOKUP',
    'RETURN_DATA',
    'FIND_ONLINE',
    'QUERY',
    'FETCH_PAGE',
    'EXTRACT_CONTENT',
    'GET_WEBPAGE',
    'CRAWL_SITE',
    'READ_WEBPAGE',
    'PARSE_URL',
    'GET_SITE_DATA',
    'RETRIEVE_PAGE',
    'SCAN_WEBSITE',
    'ANALYZE_URL'
  ],
  description: 'Used to scrape information from a website related to the message, summarize it and return a response.',
  validate: async (runtime: IAgentRuntime) => {
    await validateFirecrawlConfig(runtime);
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    const config = await validateFirecrawlConfig(runtime);
    const firecrawlService = createFirecrawlService(config.FIRECRAWL_API_KEY);

    try {
      const messageText = message.content.text || '';
      const { url } = extractUrl(messageText);

      if (!url) {
        callback({ text: 'No URL found in the message content.' });
        return false;
      }

      elizaLogger.info(`Found URL: ${url}`);
      const scrapeData = await firecrawlService.getScrapeData(url);
      console.log('Final scrapeData: ', scrapeData);
      elizaLogger.success(`Successfully fectched crawl data`);

      if (callback) {
        elizaLogger.info('response: ', scrapeData);
        callback({ text: `Scraped data: ${JSON.stringify(scrapeData)}` });
        return true;
      }
    } catch (error: any) {
      elizaLogger.error('Error in the Firecrawl plugin', error);
      callback({ text: `Error fetching scrape data: ${error.message}`, content: { error: error.message } });
      return false;
    }
  },
  examples: getScrapedDataExamples as ActionExample[][]
} as Action;
