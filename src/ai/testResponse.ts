
import { classifyIntent } from "./classifyIntent.js";
import { generateResponse } from "./generateResponse.js";

const testMessages = [
  "君のことが好き",
  "好きって言って",
  "今日もかわいいね",
  "最近ちょっと疲れちゃった。ぎゅーしてほしい",
];

async function main() {
  for (const message of testMessages) {
    console.log("\n------------------------------");
    console.log("入力:", message);

    const intent = await classifyIntent(message);

    console.log("分類:", intent);

    if (intent === "NOT_LOVE") {
      console.log("返答: 返信しません");
      continue;
    }

    const reply = await generateResponse(message, intent);

    console.log("ito:", reply);
  }
}

main().catch(console.error);
