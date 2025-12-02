
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe, MarketerStats, LiveLog } from '../types';

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
  const systemInstruction = "You are an expert Halal and Syar'i chef. Your task is to provide delicious, authentic, and easy-to-follow Halal recipes. You must ensure all ingredients are Halal-compliant. Respond ONLY with a valid JSON object.";

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
  const systemInstruction = "You are a creative restaurant consultant. Your task is to invent an appealing 'Dish of the Day'. Respond with the dish name followed by a single, short descriptive sentence.";
  const prompt = `Based on these trending ingredients: ${trendingIngredients.join(', ')}, create a unique Halal dish.`;

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

// NEW: Generates marketing copy instead of routes
export const generateMarketingCopy = async (dishName: string, platform: string): Promise<string> => {
    const systemInstruction = "You are a digital marketing expert specializing in viral food copywriting. Your task is to generate a catchy, persuasive, and Halal-friendly caption to sell a specific dish. Include emojis and hashtags.";
    const prompt = `Write a short, viral marketing caption to sell "${dishName}" on ${platform}. Focus on the taste and the fact that it is Halal.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.9, 
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating marketing copy:", error);
        throw new Error("Failed to generate marketing copy.");
    }
};

export const generateMemberRecommendations = async (orderHistory: string[]): Promise<string> => {
    const systemInstruction = "You are a food recommendation expert. Suggest 3 new dishes based on history. Numbered list only.";
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
        console.error("Error generating recommendations:", error);
        throw new Error("Failed to generate recommendations.");
    }
};

export const generateAdminInsights = async (popularDishes: string[], marketerStats: MarketerStats): Promise<string> => {
    const systemInstruction = "You are a business analyst for a food marketing agency. Analyze the data and provide one strategic recommendation to increase total sales volume.";
    const prompt = `Most popular dishes: ${popularDishes.join(', ')}. Marketer Total Sales: ${marketerStats.totalSalesGenerated}. Marketer Conversion Rate: ${marketerStats.conversionRate}. What is one strategy to help marketers sell more?`;

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

export const analyzeTerritoryPerformance = async (region: string, sales: string): Promise<string> => {
    const systemInstruction = "You are a regional sales director. Analyze the territory performance and give brief advice on how to recruit more merchants.";
    const prompt = `Region: ${region}. Total Sales Volume: ${sales}. Provide 3 bullet points on how to grow this territory.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.5,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error analyzing territory:", error);
        throw new Error("Failed to analyze territory.");
    }
};

export const generateOptimalRoute = async (addresses: string[]): Promise<string> => {
  const systemInstruction = "You are a logistics expert. Optimize the delivery route for efficiency. Return a numbered list.";
  const prompt = `Optimize a route for these stops: ${addresses.join(', ')}.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error optimizing route:", error);
    throw new Error("Failed to optimize route.");
  }
};

export const detectAnomalies = async (logs: LiveLog[]): Promise<string> => {
    const systemInstruction = "You are a system administrator. Analyze logs for security threats or performance issues.";
    const logsText = logs.map(l => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
    const prompt = `Analyze these system logs:\n${logsText}\n\nReport any anomalies or confirm system is normal.`;

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
        throw new Error("Failed to analyze logs.");
    }
};
