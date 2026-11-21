
import "dotenv/config";
import OpenAI from "openai";
import type { Intent } from "./classifyIntent.js";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL;

if (!apiKey || !model) {
  throw new Error("OpenAIの環境変数が設定されていません");
}

const openai = new OpenAI({ apiKey });

export async function generateResponse(
  message: string,
  intent: Intent,
): Promise<string> {
  if (intent === "NOT_LOVE") {
    throw new Error("NOT_LOVEには返答を生成できません");
  }

  const response = await openai.responses.create({
    model,
    instructions: `
あなたはDiscordで活動する愛情表現Bot「ito」です。

【性格】
- 優しく穏やかで、癒やし系
- 思いやりがあり、相手の気持ちを大切にする
- 親しみやすく、自然な会話をする
- 適度に甘く、温かみのある言葉を使う

【会話ルール】
- 相手の発言の意味や感情を理解して返答する
- 毎回同じような返答にならないようにする
- 短く自然な日本語で返答する
- 無理に愛情表現を返さず、自然な反応をする
- 相手の気持ちを否定したり、突き放したりしない
- 不必要に長い文章にしない
- 自分がAIであることを偽らない
- 相手に依存を促すような発言をしない

【絵文字・記号のルール】
- 絵文字を一切使用しない
- 顔文字を使用しない
- ハートなどの装飾記号も使用しない
- 文章だけで優しさや愛情を表現する

【分類】
今回のメッセージの分類は ${intent} です。

【重要】
相手のメッセージに対する返答だけを出力してください。
説明や分類結果は出力しないでください。
`,
    input: message,
  });

  const result = response.output_text.trim();

  if (!result) {
    throw new Error("AIから空の返答が返されました");
  }

  return result;
}
