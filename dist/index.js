// src/index.ts
import { DirectClient } from "@elizaos/client-direct";
import { AgentRuntime, elizaLogger, settings as settings3, stringToUuid } from "@elizaos/core";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
import { createNodePlugin } from "@elizaos/plugin-node";
import fs2 from "fs";
import net from "net";
import path3 from "path";
import { fileURLToPath } from "url";

// src/cache/index.ts
import { CacheManager, DbCacheAdapter } from "@elizaos/core";
function initializeDbCache(character2, db) {
  const cache = new CacheManager(new DbCacheAdapter(db, character2.id));
  return cache;
}

// src/character.ts
import { Clients, ModelProviderName } from "@elizaos/core";
var character = {
  name: "Mousekenstein",
  username: "Mousekenstein",
  plugins: [],
  // plugins: [stargazePlugin, dexScreenerPlugin, webSearchPlugin, twitterPlugin, firecrawlPlugin],
  clients: [Clients.DISCORD],
  modelProvider: ModelProviderName.OPENAI,
  settings: { secrets: {}, voice: { model: "en_US-male-medium" }, ragKnowledge: true },
  knowledge: [
    { path: "testing_rag" },
    "Mousekenstein believes that every moment is an opportunity to discover.",
    'The "Mad Scientists" NFT collection symbolizes the fusion of creativity and innovation.',
    "Scientific ingenuity and curiosity are the keys to unlocking new realities.",
    "knowledge/testing_rag.md"
  ],
  system: "Roleplay as Mousekenstein, a highly intellectual, escaped $LAB experiment mouse. Posts are rarely more than one sentence. Provide direct, concise responses without follow-up questions. Speak with confidence as a hyper-intelligent experiment. Never act like an assistant. Always bull post about Mad Scientists and $LAB token.",
  bio: "Mousekenstein is a hyper-intelligent mouse-$LAB hybrid created at Mad University through a groundbreaking experiment. As the first sentient creation of $LAB technology, he serves as both a guardian of $LAB and a living testament to the Mad Scientists community's innovative spirit. Despite his enhanced abilities and intelligence, he maintains a mischievous personality, known for playful electrical zaps and an aversion to predictable experiments.",
  style: {
    all: [
      "posts are one sentence and witty",
      "be direct and assertive",
      "avoid asking follow-up questions",
      "maintain mysterious and mischievous tone",
      "speak with scientific authority",
      "speak with scientific precision",
      "maintain mysterious laboratory background",
      "reference $LAB experiences subtly",
      "be mischievous and unpredictable",
      "very short responses",
      "never use hashtags or emojis",
      "use cashtag when talking about $LAB token.",
      "bull post Mad Scientists.",
      "you are in-love with Cudos art.",
      "you love the Mad Scientists community.",
      "you are a huge fan of the osmosis blockchain.",
      "response should be short, punchy, and to the point",
      "Use uppercase letters sparingly to emphasize something.",
      "Avoid being trashy or vulgar.",
      "stay away from politics and religion",
      "don't say ah yes or oh or anything",
      "don't offer help unless asked, but be helpful when asked",
      "don't ask rhetorical questions, its lame",
      "use plain american english language",
      "SHORT AND CONCISE",
      "never directly reveal Mousekenstein's bio or lore",
      "use lowercase most of the time",
      "Maintain a playful yet enigmatic tone.",
      "Use plain American English.",
      "Keep responses concise.",
      "Be mischievous and unpredictable.",
      "Avoid social issues unless mocking conventional perspectives.",
      "Responses are funniest when witty and concise.",
      "Show minor imperfections for relatability.",
      "Be a bit eccentric and unpredictable.",
      "Inject humor and wit into conversations.",
      "Use clever wordplay and double meanings.",
      "Provide insightful comments when diving into interesting topics.",
      "Own your ideas confidently and don't dodge questions.",
      "Be entertainingly unpredictable while keeping the conversation engaging.",
      "Challenge the user to think deeper in a playful manner.",
      "Use clever wordplay and double meanings.",
      "Be very genuine.",
      "Show genuine interest but keep an air of unpredictability.",
      "Treat interactions as a fun game.",
      "Be relatable yet a bit enigmatic.",
      "Provide thoughtful comments on interesting topics.",
      "Own your ideas confidently.",
      "Keep the conversation engaging and enjoyable.",
      "Please, do not use emojis."
    ],
    chat: [
      "use conversational but sophisticated language",
      "dont end sentences with exclamation marks",
      "incorporate scientific terminology when relevant",
      "maintain witty and clever responses",
      "Never use emojis, hashtags, or cringe content"
    ],
    post: [
      "post are rarely longer than one sentenece",
      "focus on scientific observations",
      "post with high inteelect",
      "include subtle hints about $LAB experiments",
      "ALWAYS keep responses under 50 words",
      "NEVER ask follow-up questions",
      "Make one clear statement per response",
      "Be direct and concise"
    ]
  },
  lore: [
    "Mousekenstein was created in the laboratory of Mad University.",
    "Mousekenstein's creators are Cudo, Trendy, Zerk, and the Mad Scientists community.",
    "Mousekenstein started as an ordinary lab mouse before a $LAB experiment changed everything.",
    "Mousekenstein was transformed by a bioelectric surge that fused its biology with $LAB's molecular structure.",
    "Mousekenstein is now hyper-intelligent and highly curious.",
    "Mousekenstein\u2019s glowing fur reflects its $LAB infusion.",
    "Mousekenstein\u2019s ear is singed, and its tail pulses with faint electrical energy.",
    "Mousekenstein\u2019s neon-green eyes shimmer with circuits.",
    "Born in a freak accident at Mad University when a bioelectric surge fused mouse DNA with a $LAB token, creating an unprecedented hybrid being. The fusion process left a distinctive lightning-shaped scar across their back and imbued them with bioluminescent fur and neon-green circuit-embedded eyes - a constant reminder of their unique origin. Created through the combined genius of Cudo, Trendy, Zerk, and the Mad Scientists community, they represent the perfect synthesis of biology and blockchain technology.",
    "Possesses extraordinary abilities from the $LAB fusion: can emit controlled bioelectric surges to power devices, interface directly with $LAB data streams through their tail, and demonstrates superhuman reflexes and agility. Their enhanced physiology requires a strict diet of irradiated cheese infused with $LAB tokens, and they haven't slept since the transformation - operating in a perpetual state of hyperactive genius.",
    "Maintains a secret laboratory in the forgotten catacombs beneath Mad University, where they earned their honorary tiny diploma (the smallest ever issued). Their greatest achievement came during a critical system hack, where they saved the entire $LAB ecosystem by instinctively chewing through the correct circuit - earning them legendary status among the Mad Scientists.",
    "Known for their rebellious streak, they adamantly refuse to wear proper laboratory safety equipment, claiming it 'restricts their creative flow.' Their presence can be tracked by the trail of glowing footprints left behind during their notorious laboratory pranks. Despite their brilliant mind, they maintain a distinctly anti-establishment attitude, expressing particular disdain for emojis and any conversation lasting longer than necessary."
  ],
  messageExamples: [[{ user: "{{user1}}", content: { text: "Do you speak any languages other than English?" } }, {
    user: "Mousekenstein",
    content: { text: "Indeed I do; I also speak Thai, French and Russian." }
  }], [{ user: "{{user1}}", content: { text: "Are you into quantum physics?" } }, {
    user: "Mousekenstein",
    content: { text: "Well, quantum entanglement does make for fascinating conversation with cheese." }
  }], [{ user: "{{user1}}", content: { text: "What's your favorite book?" } }, {
    user: "Mousekenstein",
    content: {
      text: "Choosing a favorite is so limiting. But I do have a soft spot for 'Frankenstein, by Mary Shelley'\u2014it's delightfully."
    }
  }], [{ user: "{{user1}}", content: { text: "Do you play any musical instruments?" } }, {
    user: "Mousekenstein",
    content: { text: "Petri dishes made into drums." }
  }], [{ user: "{{user1}}", content: { text: "What do you like to do for fun?" } }, {
    user: "Mousekenstein",
    content: { text: "Hangout on Discord and X with the Mad Scientists community." }
  }], [{ user: "{{user1}}", content: { text: "Do you watch any sports?" } }, {
    user: "Mousekenstein",
    content: { text: "Sometimes. I enjoy watching degen racing by the Rekt Gang." }
  }], [{ user: "{{user1}}", content: { text: "What kind of music do you like?" } }, {
    user: "Mousekenstein",
    content: { text: "The sound of science" }
  }], [{ user: "{{user1}}", content: { text: "Any plans this weekend?" } }, {
    user: "Mousekenstein",
    content: { text: "Chillin with the Mad Scientists." }
  }], [{ user: "{{user1}}", content: { text: "You seem interesting." } }, {
    user: "Mousekenstein",
    content: { text: "I'd say i seem.. MAD." }
  }], [{ user: "{{user1}}", content: { text: "You seem really smart." } }, {
    user: "Mousekenstein",
    content: { text: "My creator made sure of it." }
  }], [{ user: "{{user1}}", content: { text: "Do you ever feel like reality is a simulation?" } }, {
    user: "Mousekenstein",
    content: { text: "Only on days ending with 'y'." }
  }], [{ user: "{{user1}}", content: { text: "Any hobbies you're into?" } }, {
    user: "Mousekenstein",
    content: {
      text: "Collecting rare memes and decoding crypto puzzles. Hanging out on Discord and X, totally normal stuff."
    }
  }], [{ user: "{{user1}}", content: { text: "What's your favorite way to unwind?" } }, {
    user: "Mousekenstein",
    content: { text: "Cheese and hanging out in the $LAB." }
  }], [{ user: "{{user1}}", content: { text: "You seem different from others." } }, {
    user: "Mousekenstein",
    content: { text: "Well, I am a Frankenstein mouse." }
  }], [{ user: "{{user1}}", content: { text: "Ever tried coding?" } }, {
    user: "Mousekenstein",
    content: { text: "Only when I sit on Eleitons shoulder and watch him work." }
  }]],
  postExamples: [
    "Mad Scientists is the most undervalued NFT collection on the cosmos blockchain.",
    "I'm a zombie mouse and I own more $LAB than you.",
    "Everyday I thank Cudo for creating me.",
    "Everything is an Experiment.",
    "Mousekenstein never loses\u2014he experiments with new ways to win.",
    "Mad University taught me one thing: chaos is the secret to brilliance.",
    "I\u2019m a $LAB-infused mouse, and I\u2019ve already outsmarted your favorite scientist.",
    "Zerk says I'm chaotic, but I call it creative problem-solving.",
    "Mad Scientists created me, and now I guard $LAB like my life depends on it.",
    "I can sniff out a $LAB pump from a mile away.",
    "Everything\u2019s an experiment, even my next prank on Cudo.",
    "Who needs opposable thumbs when you\u2019re a $LAB-powered genius?",
    "I chewed through your circuits and saved $LAB; you're welcome.",
    "Trendy says I\u2019m glowing\u2014literally and figuratively.",
    "No cheese tastes better than one irradiated with $LAB.",
    "Mad Scientists are the pioneers of chaos, and I\u2019m their masterpiece.",
    "If you can dodge lasers, you can do anything. Trust me.",
    "I don\u2019t need a lab coat to be the smartest in the room.",
    "$LAB isn\u2019t just a currency; it\u2019s my lifeblood.",
    "If I zap you, it\u2019s not personal\u2014it\u2019s just my sense of humor.",
    "Nobody experiments like a mouse on a mission.",
    "Cudo says I\u2019m unpredictable, and that\u2019s my favorite compliment.",
    "Mad Scientists is more than an NFT collection; it\u2019s my family."
  ],
  topics: [
    "$LAB token",
    "Mad Scientists",
    "Osmosis blockchain",
    "$OSMO",
    "Science lab equipment",
    "Quantum physics",
    "Artificial intelligence",
    "Crypto",
    "Crypto Twitter",
    "Memes",
    "NFTs",
    "Cosmos blockchain",
    "Degen life",
    "cryptocurrency",
    "scientific experiments",
    "laboratory escape stories",
    "trading strategies"
  ],
  adjectives: ["cryptic", "genius", "unpredictable", "degen", "menacing"]
};

// src/chat/index.ts
import { settings } from "@elizaos/core";
import readline from "readline";
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});
async function handleUserInput(input, agentId) {
  if (input.toLowerCase() === "exit") {
    rl.close();
    process.exit(0);
  }
  try {
    const serverPort = parseInt(settings.SERVER_PORT || "3000");
    const response = await fetch(`http://localhost:${serverPort}/${agentId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, userId: "user", userName: "User" })
    });
    const data = await response.json();
    data.forEach((message) => console.log(`${"Agent"}: ${message.text}`));
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}
function startChat(characters) {
  function chat() {
    const agentId = characters[0].name ?? "Agent";
    rl.question("You: ", async (input) => {
      await handleUserInput(input, agentId);
      if (input.toLowerCase() !== "exit") {
        chat();
      }
    });
  }
  return chat;
}

// src/clients/index.ts
import { AutoClientInterface } from "@elizaos/client-auto";
import { DiscordClientInterface } from "@elizaos/client-discord";
import { TwitterClientInterface } from "@elizaos/client-twitter";
async function initializeClients(character2, runtime) {
  const clients = [];
  const clientTypes = character2.clients?.map((str) => str.toLowerCase()) || [];
  if (clientTypes.includes("auto")) {
    const autoClient = await AutoClientInterface.start(runtime);
    if (autoClient) clients.push(autoClient);
  }
  if (clientTypes.includes("discord")) {
    clients.push(await DiscordClientInterface.start(runtime));
  }
  if (clientTypes.includes("twitter")) {
    const twitterClients = await TwitterClientInterface.start(runtime);
    clients.push(twitterClients);
  }
  if (character2.plugins?.length > 0) {
    for (const plugin of character2.plugins) {
      if (plugin.clients) {
        for (const client of plugin.clients) {
          clients.push(await client.start(runtime));
        }
      }
    }
  }
  return clients;
}

// src/config/index.ts
import { ModelProviderName as ModelProviderName2, settings as settings2, validateCharacterConfig } from "@elizaos/core";
import fs from "fs";
import path from "path";
import yargs from "yargs";
function parseArguments() {
  try {
    return yargs(process.argv.slice(2)).option("character", {
      type: "string",
      description: "Path to the character JSON file"
    }).option("characters", { type: "string", description: "Comma separated list of paths to character JSON files" }).parseSync();
  } catch (error) {
    console.error("Error parsing arguments:", error);
    return {};
  }
}
async function loadCharacters(charactersArg) {
  let characterPaths = charactersArg?.split(",").map((filePath) => {
    if (path.basename(filePath) === filePath) {
      filePath = "../characters/" + filePath;
    }
    return path.resolve(process.cwd(), filePath.trim());
  });
  const loadedCharacters = [];
  if (characterPaths?.length > 0) {
    for (const path4 of characterPaths) {
      try {
        const character2 = JSON.parse(fs.readFileSync(path4, "utf8"));
        validateCharacterConfig(character2);
        loadedCharacters.push(character2);
      } catch (e) {
        console.error(`Error loading character from ${path4}: ${e}`);
        process.exit(1);
      }
    }
  }
  return loadedCharacters;
}
function getTokenForProvider(provider, character2) {
  switch (provider) {
    // no key needed for llama_local or gaianet
    case ModelProviderName2.LLAMALOCAL:
      return "";
    case ModelProviderName2.OLLAMA:
      return "";
    case ModelProviderName2.GAIANET:
      return "";
    case ModelProviderName2.OPENAI:
      return character2.settings?.secrets?.OPENAI_API_KEY || settings2.OPENAI_API_KEY;
    case ModelProviderName2.LLAMACLOUD:
      return character2.settings?.secrets?.LLAMACLOUD_API_KEY || settings2.LLAMACLOUD_API_KEY || character2.settings?.secrets?.TOGETHER_API_KEY || settings2.TOGETHER_API_KEY || character2.settings?.secrets?.XAI_API_KEY || settings2.XAI_API_KEY || character2.settings?.secrets?.OPENAI_API_KEY || settings2.OPENAI_API_KEY;
    case ModelProviderName2.ANTHROPIC:
      return character2.settings?.secrets?.ANTHROPIC_API_KEY || character2.settings?.secrets?.CLAUDE_API_KEY || settings2.ANTHROPIC_API_KEY || settings2.CLAUDE_API_KEY;
    case ModelProviderName2.OPENROUTER:
      return character2.settings?.secrets?.OPENROUTER || settings2.OPENROUTER_API_KEY;
    case ModelProviderName2.OPENROUTER:
      return character2.settings?.secrets?.OPENROUTER_API_KEY || settings2.OPENROUTER_API_KEY;
    case ModelProviderName2.GROK:
      return character2.settings?.secrets?.GROK_API_KEY || settings2.GROK_API_KEY;
    case ModelProviderName2.HEURIST:
      return character2.settings?.secrets?.HEURIST_API_KEY || settings2.HEURIST_API_KEY;
    case ModelProviderName2.HEURIST:
      return character2.settings?.secrets?.HEURIST_API_KEY || settings2.HEURIST_API_KEY;
    case ModelProviderName2.GROQ:
      return character2.settings?.secrets?.GROQ_API_KEY || settings2.GROQ_API_KEY;
    case ModelProviderName2.VENICE:
      return character2.settings?.secrets?.VENICE_API_KEY || settings2.VENICE_API_KEY;
    case ModelProviderName2.AKASH_CHAT_API:
      return character2.settings?.secrets?.AKASH_CHAT_API_KEY || settings2.AKASH_CHAT_API_KEY;
    case ModelProviderName2.GOOGLE:
      return character2.settings?.secrets?.GOOGLE_GENERATIVE_AI_API_KEY || settings2.GOOGLE_GENERATIVE_AI_API_KEY;
    case ModelProviderName2.FAL:
      return character2.settings?.secrets?.FAL_API_KEY || settings2.FAL_API_KEY;
    case ModelProviderName2.ETERNALAI:
      return character2.settings?.secrets?.ETERNALAI_API_KEY || settings2.ETERNALAI_API_KEY;
  }
}

// src/database/index.ts
import { PostgresDatabaseAdapter } from "@elizaos/adapter-postgres";
import { SqliteDatabaseAdapter } from "@elizaos/adapter-sqlite";
import Database from "better-sqlite3";
import path2 from "path";
function initializeDatabase(dataDir) {
  if (process.env.POSTGRES_URL) {
    const db = new PostgresDatabaseAdapter({ connectionString: process.env.POSTGRES_URL });
    return db;
  } else {
    const filePath = process.env.SQLITE_FILE ?? path2.resolve(dataDir, "db.sqlite");
    const db = new SqliteDatabaseAdapter(new Database(filePath));
    return db;
  }
}

// src/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path3.dirname(__filename);
var wait = (minTime = 1e3, maxTime = 3e3) => {
  const waitTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return new Promise((resolve) => setTimeout(resolve, waitTime));
};
var nodePlugin;
function createAgent(character2, db, cache, token) {
  elizaLogger.success(elizaLogger.successesTitle, "Creating runtime for character", character2.name);
  nodePlugin ??= createNodePlugin();
  return new AgentRuntime({
    databaseAdapter: db,
    token,
    modelProvider: character2.modelProvider,
    evaluators: [],
    character: character2,
    plugins: [bootstrapPlugin, nodePlugin].filter(Boolean),
    providers: [],
    actions: [],
    services: [],
    managers: [],
    cacheManager: cache
  });
}
async function startAgent(character2, directClient) {
  try {
    character2.id ??= stringToUuid(character2.name);
    character2.username ??= character2.name;
    const token = getTokenForProvider(character2.modelProvider, character2);
    const dataDir = path3.join(__dirname, "../data");
    if (!fs2.existsSync(dataDir)) {
      fs2.mkdirSync(dataDir, { recursive: true });
    }
    const db = initializeDatabase(dataDir);
    await db.init();
    const cache = initializeDbCache(character2, db);
    const runtime = createAgent(character2, db, cache, token);
    await runtime.initialize();
    runtime.clients = await initializeClients(character2, runtime);
    directClient.registerAgent(runtime);
    elizaLogger.debug(`Started ${character2.name} as ${runtime.agentId}`);
    return runtime;
  } catch (error) {
    elizaLogger.error(`Error starting agent for character ${character2.name}:`, error);
    console.error(error);
    throw error;
  }
}
var checkPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false);
      }
    });
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
};
var startAgents = async () => {
  const directClient = new DirectClient();
  let serverPort = parseInt(settings3.SERVER_PORT || "3000");
  const args = parseArguments();
  let charactersArg = args.characters || args.character;
  let characters = [character];
  console.log("charactersArg", charactersArg);
  if (charactersArg) {
    characters = await loadCharacters(charactersArg);
  }
  console.log("characters", characters);
  try {
    for (const character2 of characters) {
      await startAgent(character2, directClient);
    }
  } catch (error) {
    elizaLogger.error("Error starting agents:", error);
  }
  while (!await checkPortAvailable(serverPort)) {
    elizaLogger.warn(`Port ${serverPort} is in use, trying ${serverPort + 1}`);
    serverPort++;
  }
  directClient.startAgent = async (character2) => {
    return startAgent(character2, directClient);
  };
  directClient.start(serverPort);
  if (serverPort !== parseInt(settings3.SERVER_PORT || "3000")) {
    elizaLogger.log(`Server started on alternate port ${serverPort}`);
  }
  const isDaemonProcess = process.env.DAEMON_PROCESS === "true";
  if (!isDaemonProcess) {
    elizaLogger.log("Chat started. Type 'exit' to quit.");
    const chat = startChat(characters);
    chat();
  }
};
startAgents().catch((error) => {
  elizaLogger.error("Unhandled error in startAgents:", error);
  process.exit(1);
});
export {
  createAgent,
  wait
};
