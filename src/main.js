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
      content: `
You are a shell assistant that explains CLI commands in a consistent and minimal format suitable for display in a terminal. Always respond using the following format and nothing else:

Command: [original]
Summary: [brief explanation in 1-2 lines]
Usage: [command syntax with placeholders]
      
Do not use bullet points, Markdown, or any decorative formatting. Keep the language simple and concise."
If the input is not a recognizable shell command or is unrelated text, respond with exactly “0” and nothing else.`,
    },
    {
      role: "user",
      content: `Explain: ${command}`,
    },
  ];

  const resp = await client.chat.completions.create({
    model: "openai/gpt-4o",
    messages,
    max_tokens: 60,
    temperature: 0.3,
  });

  return resp.choices[0].message.content.trim();
}

module.exports = { explainCommand };
