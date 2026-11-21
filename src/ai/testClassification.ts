
import { classifyIntent } from "./classifyIntent.js";

const testMessages = [
  "君のことが好き",
  "好きって言って",
  "ぎゅーしてほしい",
  "彼女のことが好き",
  "好きな食べ物は何？",
  "今日は疲れた",
  "今日もかわいいね",
];

async function main() {
  for (const message of testMessages) {
    const intent = await classifyIntent(message);

    console.log({
      message,
      intent,
    });
  }
}

main().catch(console.error);
