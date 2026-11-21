
import type { Message } from "discord.js";
import { processMessage } from "../../ai/itoAI.js";

export async function handleMessage(message: Message) {
  if (message.author.bot) return;

  if (message.channelId !== process.env.TARGET_CHANNEL_ID) return;

  const content = message.content.trim();

  if (!content) return;

  try {
    const result = await processMessage(content);

    if (result.intent === "NOT_LOVE") return;

    await message.reply({
      content: result.reply,
      allowedMentions: {
        repliedUser: false,
      },
    });

  } catch (error) {
    console.error("メッセージ処理エラー:", error);
  }
}
