// src/config/index.ts

import { Character, ModelProviderName, settings, validateCharacterConfig } from '@elizaos/core';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';

export function parseArguments(): { character?: string, characters?: string } {
  try {
    return yargs(process.argv.slice(2)).option('character', {
      type: 'string',
      description: 'Path to the character JSON file'
    }).option('characters', { type: 'string', description: 'Comma separated list of paths to character JSON files' })
      .parseSync();
  } catch (error) {
    console.error('Error parsing arguments:', error);
    return {};
  }
}

export async function loadCharacters(charactersArg: string): Promise<Character[]> {
  let characterPaths = charactersArg?.split(',').map((filePath) => {
    if (path.basename(filePath) === filePath) {
      filePath = '../characters/' + filePath;
    }
    return path.resolve(process.cwd(), filePath.trim());
  });

  const loadedCharacters = [];

  if (characterPaths?.length > 0) {
    for (const path of characterPaths) {
      try {
        const character = JSON.parse(fs.readFileSync(path, 'utf8'));

        validateCharacterConfig(character);

        loadedCharacters.push(character);
      } catch (e) {
        console.error(`Error loading character from ${path}: ${e}`);
        process.exit(1);
      }
    }
  }

  return loadedCharacters;
}

export function getTokenForProvider(provider: ModelProviderName, character: Character) {
  switch (provider) {
    // no key needed for llama_local or gaianet
    case ModelProviderName.LLAMALOCAL:
      return '';
    case ModelProviderName.OLLAMA:
      return '';
    case ModelProviderName.GAIANET:
      return '';
    case ModelProviderName.OPENAI:
      return (character.settings?.secrets?.OPENAI_API_KEY || settings.OPENAI_API_KEY);
    case ModelProviderName.LLAMACLOUD:
      return (character.settings?.secrets?.LLAMACLOUD_API_KEY ||
        settings.LLAMACLOUD_API_KEY ||
        character.settings?.secrets?.TOGETHER_API_KEY ||
        settings.TOGETHER_API_KEY ||
        character.settings?.secrets?.XAI_API_KEY ||
        settings.XAI_API_KEY ||
        character.settings?.secrets?.OPENAI_API_KEY ||
        settings.OPENAI_API_KEY);
    case ModelProviderName.ANTHROPIC:
      return (character.settings?.secrets?.ANTHROPIC_API_KEY ||
        character.settings?.secrets?.CLAUDE_API_KEY ||
        settings.ANTHROPIC_API_KEY ||
        settings.CLAUDE_API_KEY);
    case ModelProviderName.OPENROUTER:
      return (character.settings?.secrets?.OPENROUTER || settings.OPENROUTER_API_KEY);
    case ModelProviderName.OPENROUTER:
      return (character.settings?.secrets?.OPENROUTER_API_KEY || settings.OPENROUTER_API_KEY);
    case ModelProviderName.GROK:
      return (character.settings?.secrets?.GROK_API_KEY || settings.GROK_API_KEY);
    case ModelProviderName.HEURIST:
      return (character.settings?.secrets?.HEURIST_API_KEY || settings.HEURIST_API_KEY);
    case ModelProviderName.HEURIST:
      return (character.settings?.secrets?.HEURIST_API_KEY || settings.HEURIST_API_KEY);
    case ModelProviderName.GROQ:
      return character.settings?.secrets?.GROQ_API_KEY || settings.GROQ_API_KEY;
    case ModelProviderName.VENICE:
      return (character.settings?.secrets?.VENICE_API_KEY || settings.VENICE_API_KEY);
    case ModelProviderName.AKASH_CHAT_API:
      return (character.settings?.secrets?.AKASH_CHAT_API_KEY || settings.AKASH_CHAT_API_KEY);
    case ModelProviderName.GOOGLE:
      return (character.settings?.secrets?.GOOGLE_GENERATIVE_AI_API_KEY || settings.GOOGLE_GENERATIVE_AI_API_KEY);
    case ModelProviderName.FAL:
      return (character.settings?.secrets?.FAL_API_KEY || settings.FAL_API_KEY);
    case ModelProviderName.ETERNALAI:
      return (character.settings?.secrets?.ETERNALAI_API_KEY || settings.ETERNALAI_API_KEY);
  }
}
