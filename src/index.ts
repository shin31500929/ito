import {
  Client,
  GatewayIntentBits,
} from "discord.js";
import { handleMessage } from "./discord/events/messageCreate.js";
import "dotenv/config";
import type { Message } from "discord.js";
const token = process.env.DISCORD_TOKEN;
const channelId = process.env.TARGET_CHANNEL_ID;

if (!token) {
  throw new Error("DISCORD_TOKENが設定されていません");
}

if (!channelId) {
  throw new Error("TARGET_CHANNEL_IDが設定されていません");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("clientReady", (readyClient) => {
  // console.log(`ログイン成功: ${readyClient.user.tag}`);
  // console.log("WebSocket接続状態:", readyClient.ws.status);
});

client.on("messageCreate", async (message: Message) => {
  //console.log("messageCreateイベント受信");

  try {
    await handleMessage(message);
  } catch (error) {
    //console.error("メッセージ処理エラー:", error);
  }
});

client.login(token);
