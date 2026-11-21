
import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL;

if (!apiKey) {
  throw new Error("OPENAI_API_KEYが設定されていません");
}

if (!model) {
  throw new Error("OPENAI_MODELが設定されていません");
}

const openai = new OpenAI({
  apiKey,
});

async function main() {
  try {
    const response = await openai.responses.create({
      model,
      input: "こんにちは。優しく短く挨拶してください。",
    });

    console.log("OpenAI API接続成功");
    console.log("モデル:", model);
    console.log("AIの返答:", response.output_text);
  } catch (error) {
    console.error("OpenAI API接続失敗");

    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

main();
