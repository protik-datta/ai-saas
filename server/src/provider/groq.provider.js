const OpenAI = require("openai");
require("dotenv").config();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const isRetryable = (error) =>
  error?.status === 503 ||
  error?.status === 429 ||
  error?.message?.includes("503") ||
  error?.message?.includes("rate_limit");

const generateFromGroq = async ({
  systemInstruction,
  prompt,
  temperature = 0.5,
  jsonMode = false,
}) => {
  const models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

  for (let modelName of models) {
    try {
      const response = await groq.chat.completions.create({
        model: modelName,
        temperature,
        response_format: jsonMode ? { type: "json_object" } : undefined,
        messages: [
          ...(systemInstruction
            ? [{ role: "system", content: systemInstruction }]
            : []),
          { role: "user", content: prompt },
        ],
      });

      const text = response?.choices?.[0]?.message?.content;

      if (!text) throw new Error("Empty Groq response");

      return text;
    } catch (error) {
      const isLast = modelName === models.at(-1);

      if (isRetryable(error) && !isLast) {
        console.warn(`⚠️ ${modelName} unavailable, trying next model...`);
        continue;
      }

      throw error;
    }
  }
};

module.exports = { generateFromGroq };
