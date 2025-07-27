const { OpenAI } = require("openai");
require("dotenv").config();

async function explainCommand(command) {
  const apiKey = process.env.API_TOKEN;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY not set in .env");
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1", 
  });

  const messages = [
    {
      role: "system",
      content: "You are an AI assistant specialized in explaining shell commands (bash, git, npm, docker, etc.). When given a valid shell command, provide a concise, professional explanation and a one-line example, formatted for terminal display in English only. If the input is not a recognizable shell command or is unrelated text, respond with exactly “0” and nothing else."
    },
    {
      role: "user",
      content: `Explain: ${command}`
    }
  ];

  const resp = await client.chat.completions.create({
    model: "openai/gpt-4o", 
    messages,
    max_tokens: 150,
    temperature: 0.3
  });

  return resp.choices[0].message.content.trim();
}

module.exports = { explainCommand };