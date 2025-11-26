import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLifeQuote = async (monthsLived: number, monthsRemaining: number): Promise<string> => {
  if (!apiKey) {
    return "Time is the coin of your life. It is the only coin you have, and only you can determine how it will be spent.";
  }

  try {
    const prompt = `
      You are a stoic philosopher observing a human life.
      This person has lived ${monthsLived} months.
      They have approximately ${monthsRemaining} months left until age 80.
      
      Generate a single, piercing, deeply philosophical, and dramatic sentence.
      Focus on the scarcity of the remaining time (${monthsRemaining} months) or the weight of the time lived.
      It should feel like a wake-up call. Elegant, poetic, but heavy.
      Avoid clichés. Make it sound like Marcus Aurelius, Seneca, or a modern existentialist.
      Maximum 25 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim() || "The sands of time wait for no man. Seize this month.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Live as if you were to die tomorrow. Learn as if you were to live forever.";
  }
};