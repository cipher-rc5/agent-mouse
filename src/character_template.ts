// src/character-structure.ts - unit strictly utilized for reference purposes

import { Character, Clients, ModelProviderName } from '@elizaos/core';

export const character: Character = {
  name: 'Mousekenstein',
  plugins: [],
  clients: [Clients.TWITTER],
  modelProvider: ModelProviderName.OPENAI,
  settings: { secrets: {}, voice: { model: 'en_US-male-medium' } },
  system: 'lorem ipsum',
  bio: ['lorem ipsum'],
  lore: ['lorem ipsum', 'lorem ipsum', 'lorem ipsum'],
  knowledge: ['lorem ipsum'],
  style: {
    all: ['lorem ipsum', 'lorem ipsum', 'lorem ipsum', 'lorem ipsum'],
    chat: ['lorem ipsum', 'lorem ipsum', 'lorem ipsum'],
    post: ['lorem ipsum', 'lorem ipsum', 'lorem ipsum']
  },
  messageExamples: [[{ user: '{{user1}}', content: { text: 'lorem ipsum' } }, {
    user: 'character_name',
    content: { text: 'lorem ipsum' }
  }], [{ user: '{{user1}}', content: { text: 'lorem ipsum' } }, {
    user: 'character_name',
    content: { text: 'lorem ipsum' }
  }], [{ user: '{{user1}}', content: { text: 'lorem ipsum' } }, {
    user: 'character_name',
    content: { text: 'lorem ipsum' }
  }], [{ user: '{{user1}}', content: { text: 'lorem ipsum' } }, {
    user: 'character_name',
    content: { text: 'lorem ipsum' }
  }], [{ user: '{{user1}}', content: { text: 'lorem ipsum' } }, {
    user: 'character_name',
    content: { text: 'lorem ipsum' }
  }]],
  postExamples: ['lorem ipsum'],
  topics: ['lorem ipsum'],
  adjectives: ['lorem ipsumt', 'lorem ipsum', 'lorem ipsum']
};
