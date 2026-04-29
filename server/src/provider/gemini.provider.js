const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateFromGemini = async ({
  systemInstruction,
  prompt,
  temperature = 0.5,
  jsonMode = false,
}) => {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

  for (let modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
        generationConfig: {
          temperature,
        },
      });

      const result = await model.generateContent(prompt);

      const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Empty Gemini response");
      }

      return text;
    } catch (err) {
      if (err?.status === 503 && modelName !== models.at(-1)) {
        console.warn(`${modelName} unavailable, trying next model...`);
        continue;
      }
      throw err;
    }
  }
};

module.exports = { generateFromGemini };
