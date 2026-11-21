
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

export async function classifyIntent(
  message: string,
): Promise<Intent> {
  const response = await openai.responses.create({
    model,
    instructions: `
あなたはDiscordの愛情表現Botの意図分類器です。

メッセージを次の3種類に分類してください。

LOVE_EXPRESSION:
Bot本人に対して好意や愛情を伝えている。
例：「君が好き」「今日もかわいいね」

LOVE_REQUEST:
Bot本人に対して愛情表現やスキンシップを求めている。
例：「好きって言って」「ぎゅーして」

NOT_LOVE:
上記以外のすべて。
通常会話、質問、独り言、他人に向けた好意表現など。
例：「彼女が好き」「好きな食べ物は？」「今日は疲れた」

重要：
- 「好き」などの単語だけで判断しない。
- 誰に向けた発言なのかを考慮する。
- 判断に迷った場合はNOT_LOVEにする。
`,
    input: message,
    text: {
      format: {
        type: "json_schema",
        name: "intent_classification",
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
          },
          required: ["intent"],
          additionalProperties: false,
        },
      },
    },
  });

  const result = JSON.parse(response.output_text) as {
    intent: Intent;
  };

  return result.intent;
}
