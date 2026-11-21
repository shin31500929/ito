import type { Message } from "discord.js";

export async function handleMessage(message: Message) {
  console.log("messageCreateイベント発火");

  console.log("受信チャンネルID:", message.channelId);
  console.log("設定チャンネルID:", process.env.TARGET_CHANNEL_ID);

  if (message.author.bot) {
    console.log("Botのメッセージなので無視");
    return;
  }

  if (message.channelId !== process.env.TARGET_CHANNEL_ID) {
    console.log("対象外チャンネルなので無視");
    return;
  }

  console.log("受信メッセージ:", {
    user: message.author.username,
    content: message.content,
  });
}