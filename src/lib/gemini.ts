import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Missing VITE_GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// --- Chatbot Logic ---

export const getGeminiChatResponse = async (
    message: string,
    history: { role: "user" | "model"; parts: { text: string }[] }[]
) => {
    try {
        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        return `Error connecting to Gemini: ${error.message || error}`;
    }
};

// --- Itinerary Logic ---

export const generateGeminiItinerary = async (prompt: string) => {
    try {
        const structuredPrompt = `
      You are an expert travel planner. Create a detailed itinerary based on this request: "${prompt}".
      
      CRITICAL: Return ONLY valid JSON. Do not include markdown formatting (like \`\`\`json).
      The JSON must match this structure exactly:
      {
        "tripName": "Title of the trip",
        "duration": "e.g., 5 Days",
        "totalBudget": "e.g., $1200",
        "description": "Brief overview",
        "days": [
          {
            "day": 1,
            "title": "Theme of the day",
            "activities": ["Activity 1", "Activity 2", "Activity 3"]
          }
        ]
      }
    `;

        const result = await model.generateContent(structuredPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean up if model mistakenly checks markdown
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Itinerary Error:", error);
        throw new Error("Failed to generate itinerary");
    }
};
