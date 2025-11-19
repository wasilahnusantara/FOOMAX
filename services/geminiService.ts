
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe, RunnerStats, LiveLog } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe.",
    },
    description: {
      type: Type.STRING,
      description: "A short, appetizing description of the dish.",
    },
    prepTime: {
        type: Type.STRING,
        description: "Preparation time, e.g., '15 minutes'."
    },
    cookTime: {
        type: Type.STRING,
        description: "Cooking time, e.g., '30 minutes'."
    },
    servings: {
        type: Type.STRING,
        description: "Number of servings, e.g., '4 people'."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of ingredients with measurements.",
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of step-by-step cooking instructions.",
    },
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
};

export const generateRecipe = async (dishName: string): Promise<Recipe> => {
  // FIX: Moved persona and formatting instructions to systemInstruction for better API usage.
  const systemInstruction = "You are an expert Halal and Syar'i chef. Your task is to provide delicious, authentic, and easy-to-follow Halal recipes. You must ensure all ingredients are Halal-compliant, and must not include any non-Halal ingredients like pork, alcohol, or their derivatives. You must respond ONLY with a valid JSON object that adheres to the provided schema.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a recipe for "${dishName}".`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
        throw new Error("Received an empty response from the API.");
    }

    const recipe = JSON.parse(responseText);
    return recipe as Recipe;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe from API.");
  }
};

export const generateDishOfTheDay = async (trendingIngredients: string[]): Promise<string> => {
  const systemInstruction = "You are a creative restaurant consultant. Your task is to invent an appealing 'Dish of the Day' for a Halal restaurant. The response should be concise and enticing. Respond with only the dish name followed by a single, short descriptive sentence. Do not use markdown or any other formatting. Example: 'Galangal Infused Lamb Shank: Tender, slow-cooked lamb shank in a rich, aromatic galangal and coconut gravy.'";
  const prompt = `Based on these trending ingredients: ${trendingIngredients.join(', ')}, create a unique and appealing Halal dish of the day.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating dish of the day:", error);
    throw new Error("Failed to generate dish of the day.");
  }
};

export const generateOptimalRoute = async (addresses: string[]): Promise<string> => {
    const systemInstruction = "You are a logistics expert specializing in delivery route optimization for a food delivery runner. Given a list of delivery addresses, provide the most efficient route as a numbered list. Be concise and clear. Do not add any conversational text before or after the list. Start directly with '1.'";
    const prompt = `Here are the delivery addresses: ${addresses.join('; ')}. Suggest the most efficient delivery route.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.2, // Lower temperature for more deterministic routing
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating optimal route:", error);
        throw new Error("Failed to generate optimal route.");
    }
};

export const generateMemberRecommendations = async (orderHistory: string[]): Promise<string> => {
    const systemInstruction = "You are a food recommendation expert for a Halal food app. Based on a user's order history, suggest 3 new dishes they might enjoy. For each dish, provide a very short, one-sentence description. Respond only with a numbered list (e.g., '1. Dish Name - Description.'). Do not add any conversational text or markdown.";
    const prompt = `Based on my past orders of: ${orderHistory.join(', ')}, what should I try next?`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.7,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating member recommendations:", error);
        throw new Error("Failed to generate recommendations.");
    }
};

export const generateAdminInsights = async (popularDishes: string[], runnerStats: RunnerStats): Promise<string> => {
    const systemInstruction = "You are a senior business analyst for a food delivery platform named Foomax. Your task is to analyze platform data and provide a concise, actionable business insight. The insight should help drive growth or improve efficiency. Respond with a single paragraph. Do not use markdown or conversational language.";
    const prompt = `Based on the following data: The most popular dishes are currently ${popularDishes.join(', ')}. Our runners' average delivery time is ${runnerStats.averageDeliveryTime} with a total of ${runnerStats.completedDeliveries} deliveries completed this period. What is one strategic recommendation for the platform?`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.8,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating admin insight:", error);
        throw new Error("Failed to generate business insight.");
    }
};

export const detectAnomalies = async (logs: LiveLog[]): Promise<string> => {
    const systemInstruction = "You are a site reliability engineer (SRE) AI assistant. Your task is to analyze system logs to detect anomalies or potential issues. Review the provided logs and summarize any suspicious patterns in a concise bulleted list. If no issues are found, respond with 'All systems appear normal.' Do not use markdown.";
    const formattedLogs = logs.map(log => `[${log.timestamp}][${log.service}][${log.level.toUpperCase()}] ${log.message}`).join('\n');
    const prompt = `Here are the recent system logs:\n${formattedLogs}\n\nPlease analyze these for any anomalies.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.3,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error detecting anomalies:", error);
        throw new Error("Failed to detect anomalies.");
    }
};
