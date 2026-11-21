
import type { Message } from "discord.js";
import { classifyIntent } from "../../ai/classifyIntent.js";
import { generateResponse } from "../../ai/generateResponse.js";

export async function handleMessage(message: Message) {
  // Bot自身のメッセージには反応しない
  if (message.author.bot) {
    return;
  }

  // 対象チャンネル以外には反応しない
  if (message.channelId !== process.env.TARGET_CHANNEL_ID) {
    return;
  }

  // 空メッセージには反応しない
  const content = message.content.trim();

  if (!content) {
    return;
  }

  try {
    // AIでメッセージの意図を分類
    const intent = await classifyIntent(content);

    console.log("メッセージ:", content);
    console.log("分類結果:", intent);

    // 愛情表現以外には返信しない
    if (intent === "NOT_LOVE") {
      return;
    }

    // AIで返答を生成
    const reply = await generateResponse(content, intent);

    // Discordで返信
    await message.reply({
      content: reply,
      allowedMentions: {
        repliedUser: false,
      },
    });

    console.log("itoの返信:", reply);

  } catch (error) {
    console.error("メッセージ処理エラー:", error);
  }
}
