// plugins/plugin-twitter/src/actions/post.ts

import { type Action, composeContext, elizaLogger, generateObject, type IAgentRuntime, type Memory, ModelClass, type State } from '@elizaos/core';
import { Scraper } from 'agent-twitter-client';
import { tweetTemplate } from '../templates.ts';
import { isTweetContent } from '../types.ts';

export const DEFAULT_MAX_TWEET_LENGTH = 280;

function truncateToCompleteSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastExclamation = truncated.lastIndexOf('!');

  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  return lastSentenceEnd > 0 ? truncated.substring(0, lastSentenceEnd + 1) : truncated;
}

async function composeTweet(runtime: IAgentRuntime, _message: Memory, state?: State): Promise<string> {
  try {
    const context = composeContext({ state, template: tweetTemplate });

    const tweetContentObject = await generateObject({ runtime, context, modelClass: ModelClass.SMALL, stop: ['\n'] });

    if (!isTweetContent(tweetContentObject.object)) {
      elizaLogger.error('Invalid tweet content:', tweetContentObject.object);
      return;
    }

    let trimmedContent = tweetContentObject.object.text.trim();
    const maxTweetLength = runtime.getSetting('MAX_TWEET_LENGTH');
    if (maxTweetLength) {
      trimmedContent = truncateToCompleteSentence(trimmedContent, Number(maxTweetLength));
    }

    return trimmedContent;
  } catch (error) {
    elizaLogger.error('Error composing tweet:', error);
    throw error;
  }
}

async function sendTweet(twitterClient: Scraper, content: string) {
  const result = await twitterClient.sendTweet(content);

  const body = await result.json();
  elizaLogger.log('Tweet response:', body);

  // Check for Twitter API errors
  if (body.errors) {
    const error = body.errors[0];
    elizaLogger.error(`Twitter API error (${error.code}): ${error.message}`);
    return false;
  }

  // Check for successful tweet creation
  if (!body?.data?.create_tweet?.tweet_results?.result) {
    elizaLogger.error('Failed to post tweet: No tweet result in response');
    return false;
  }

  return true;
}

async function postTweet(runtime: IAgentRuntime, content: string): Promise<boolean> {
  try {
    const twitterClient = runtime.clients.twitter?.client?.twitterClient;
    const scraper = twitterClient || new Scraper();

    if (!twitterClient) {
      const username = runtime.getSetting('TWITTER_USERNAME');
      const password = runtime.getSetting('TWITTER_PASSWORD');
      const email = runtime.getSetting('TWITTER_EMAIL');
      const twitter2faSecret = runtime.getSetting('TWITTER_2FA_SECRET');

      if (!username || !password) {
        elizaLogger.error('Twitter credentials not configured in environment');
        return false;
      }
      // Login with credentials
      await scraper.login(username, password, email, twitter2faSecret);
      if (!(await scraper.isLoggedIn())) {
        elizaLogger.error('Failed to login to Twitter');
        return false;
      }
    }

    // Send the tweet
    elizaLogger.log('Attempting to send tweet:', content);

    try {
      if (content.length > DEFAULT_MAX_TWEET_LENGTH) {
        const noteTweetResult = await scraper.sendNoteTweet(content);
        if (noteTweetResult.errors && noteTweetResult.errors.length > 0) {
          // Note Tweet failed due to authorization. Falling back to standard Tweet.
          return await sendTweet(scraper, content);
        }
        return true;
      }
      return await sendTweet(scraper, content);
    } catch (error) {
      throw new Error(`Note Tweet failed: ${error}`);
    }
  } catch (error) {
    elizaLogger.error('Error posting tweet:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    });
    return false;
  }
}

export const postAction: Action = {
  name: 'POST_TWEET',
  similes: ['TWEET', 'POST', 'SEND_TWEET'],
  description: 'Post a tweet to Twitter',
  validate: async (runtime: IAgentRuntime, _message: Memory, _state?: State) => {
    const username = runtime.getSetting('TWITTER_USERNAME');
    const password = runtime.getSetting('TWITTER_PASSWORD');
    const email = runtime.getSetting('TWITTER_EMAIL');
    const hasCredentials = !!username && !!password && !!email;
    elizaLogger.log(`Has credentials: ${hasCredentials}`);

    return hasCredentials;
  },
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<boolean> => {
    try {
      const tweetContent = await composeTweet(runtime, message, state);

      if (!tweetContent) {
        elizaLogger.error('No content generated for tweet');
        return false;
      }

      elizaLogger.log(`Generated tweet content: ${tweetContent}`);

      if (process.env.TWITTER_DRY_RUN && process.env.TWITTER_DRY_RUN.toLowerCase() === 'true') {
        elizaLogger.info(`Dry run: would have posted tweet: ${tweetContent}`);
        return true;
      }

      return await postTweet(runtime, tweetContent);
    } catch (error) {
      elizaLogger.error('Error in post action:', error);
      return false;
    }
  },
  examples: [[{ user: '{{user1}}', content: { text: 'You should tweet that' } }, {
    user: '{{agentName}}',
    content: { text: "I'll share this update with my followers right away!", action: 'POST_TWEET' }
  }], [{ user: '{{user1}}', content: { text: 'Post this tweet' } }, {
    user: '{{agentName}}',
    content: { text: "I'll post that as a tweet now.", action: 'POST_TWEET' }
  }], [{ user: '{{user1}}', content: { text: 'Share that on Twitter' } }, {
    user: '{{agentName}}',
    content: { text: "I'll share this message on Twitter.", action: 'POST_TWEET' }
  }], [{ user: '{{user1}}', content: { text: 'Post that on X' } }, {
    user: '{{agentName}}',
    content: { text: "I'll post this message on X right away.", action: 'POST_TWEET' }
  }], [{ user: '{{user1}}', content: { text: 'You should put that on X dot com' } }, {
    user: '{{agentName}}',
    content: { text: "I'll put this message up on X.com now.", action: 'POST_TWEET' }
  }]]
};
