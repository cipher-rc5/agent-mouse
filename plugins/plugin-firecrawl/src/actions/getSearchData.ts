// plugins/plugin-firecrawl/src/actions/getSearchData.ts

import { Action, ActionExample, composeContext, elizaLogger, generateText, HandlerCallback, IAgentRuntime, Memory, State } from '@elizaos/core';
import { ModelClass } from '@elizaos/core';
import { validateFirecrawlConfig } from '../environment.ts';
import { getSearchDataExamples } from '../examples.ts';
import { createFirecrawlService } from '../services.ts';
import { getSearchDataContext, getSearchDataPrompt } from '../templates.ts';

export const getSearchDataAction: Action = {
  name: 'WEB_SEARCH',
  similes: [
    'SEARCH_WEB',
    'INTERNET_SEARCH',
    'LOOKUP',
    'QUERY_WEB',
    'FIND_ONLINE',
    'SEARCH_ENGINE',
    'WEB_LOOKUP',
    'ONLINE_SEARCH',
    'FIND_INFORMATION'
  ],
  description: 'Perform a web search to find information related to the message.',
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

    console.log(message.content.text);
    try {
      const messageText = message.content.text || '';

      elizaLogger.info(`Found data: ${messageText}`);
      const searchData = await firecrawlService.getSearchData(messageText);

      elizaLogger.success(`Successfully fectched data`);

      const context = composeContext({ state, template: getSearchDataContext });

      const responseText = await generateText({
        runtime,
        context: `This was the user question
                        ${message.content.text}

                        The Response data from firecrawl Search API

                        ${searchData}

                     Now Summarise and use this data and provide a response to question asked`,
        modelClass: ModelClass.SMALL,
        customSystemPrompt: getSearchDataPrompt
      });

      console.log('responseText', responseText);

      // const parsedResponse = parseJSONObjectFromText(responseText);

      // console.log("parsedResponse", parsedResponse);

      if (callback) {
        callback({ text: `${JSON.stringify(responseText)}` });
        return true;
      }
    } catch (error: any) {
      elizaLogger.error('Error in the Firecrawl plugin', error);
      callback({ text: `Error fetching crawl data: ${error.message}`, content: { error: error.message } });
      return false;
    }
  },
  examples: getSearchDataExamples as ActionExample[][]
} as Action;
