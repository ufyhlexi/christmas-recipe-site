import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

// Type for recipe from API response
interface ApiRecipe {
  _id: string;
  title: string;
  description?: string;
  ratings?: number[];
  imageUrl?: string;
  price?: number;
  categories?: string[];
  instructions?: string[];
  ingredients?: Array<{
    name: string;
    amount: number;
    unit: string;
    _id?: string;
  }>;
  avgRating?: number | null;
  difficulty?: string;
  timeInMins?: number;
}

async function getRecipes() {
  try {
    console.log("🔄 Sending request to API...");
    console.log("📍 URL:", API_URL);

    const response = await axios.get(API_URL);

    console.log("\n Request successful!");
    console.log("Response status:", response.status);
    console.log("Number of recipes:", response.data.length);
    
    if (response.data.length > 0) {
      console.log("\n Example of first recipe:");
      console.log(JSON.stringify(response.data[0], null, 2));
      
      // Search for recipe with difficulty field among recently sent recipes
      const recipeWithDifficulty = response.data.find((r: ApiRecipe) => r.difficulty);
      if (recipeWithDifficulty) {
        console.log("\n Example of recipe with difficulty field:");
        console.log(`   Title: ${recipeWithDifficulty.title}`);
        console.log(`   Difficulty: ${recipeWithDifficulty.difficulty}`);
        console.log(`   ID: ${recipeWithDifficulty._id}`);
      }
    }

    console.log("\n✨ All data retrieved successfully!");

  } catch (error) {
    console.error("\n ❌ Error during request:");
    if (error instanceof Error) {
      console.error("Message:", error.message);
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("URL:", error.config?.url);
        console.error("Response data:", error.response?.data);
      }
    } else {
      console.error(String(error));
    }
  }
}

getRecipes();
