import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config({ path: "/.env" });


const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
  baseURL: "http://flock.tools:8001/v1", // defaults to https://api.openai.com/v1
});

async function main(prompt: string) {
  console.log("Prompt:", prompt);
  console.log("Model:", process.env.model_name);
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "hackathon-chat",
    });
    console.log("Response:", chatCompletion);
    console.log("Choices:", chatCompletion?.choices[0].message);
    return chatCompletion?.choices[0]?.message.content;
  } catch (error) {
    console.error("Error getting completion from OpenAI:", error);
    throw error;
  }
}

export default main;