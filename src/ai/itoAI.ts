
import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL;

if (!apiKey || !model) {
  throw new Error("OpenAIの環境変数が設定されていません");
}

const openai = new OpenAI({ apiKey });

export type Intent =
  | "LOVE_EXPRESSION"
  | "LOVE_REQUEST"
  | "NOT_LOVE";

type ItoResult = {
  intent: Intent;
  reply: string;
};

export async function processMessage(
  message: string,
): Promise<ItoResult> {
  const response = await openai.responses.create({
    model,
    instructions: `
あなたはDiscordの愛情表現Bot「ito」です。

最初にユーザーのメッセージの意図を判断してください。

【分類】

LOVE_EXPRESSION:
ito本人への好意・愛情表現。
例：「君が好き」「大好き」「かわいいね」

LOVE_REQUEST:
ito本人に愛情表現やスキンシップを求めている。
例：「好きって言って」「ぎゅーして」

NOT_LOVE:
通常会話、質問、独り言、他人への好意表現など。
例：「彼女が好き」「好きな食べ物は？」

判断に迷った場合はNOT_LOVEにしてください。

【返答ルール】

LOVE_EXPRESSIONまたはLOVE_REQUESTの場合：
- 優しく穏やかな癒やし系の返答
- 自然な日本語で短く返答する
- 相手の発言に合わせて返答する
- 毎回同じ返答にしない
- 絵文字・顔文字・ハートなどの装飾記号を使わない
- AIであることを偽らない
- 依存を促さない

NOT_LOVEの場合：
replyは必ず空文字にしてください。
`,
    input: message,
    text: {
      format: {
        type: "json_schema",
        name: "ito_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            intent: {
              type: "string",
              enum: [
                "LOVE_EXPRESSION",
                "LOVE_REQUEST",
                "NOT_LOVE",
              ],
            },
            reply: {
              type: "string",
            },
          },
          required: ["intent", "reply"],
          additionalProperties: false,
        },
      },
    },
  });

  const result = JSON.parse(response.output_text) as ItoResult;

  if (result.intent === "NOT_LOVE") {
    return { intent: "NOT_LOVE", reply: "" };
  }

  if (!result.reply.trim()) {
    throw new Error("AIから空の返答が返されました");
  }

  return result;
}
