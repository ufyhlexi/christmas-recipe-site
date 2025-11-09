import axios from "axios";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = "https://grupp1-xjvta.reky.se/recipes";
const RECIPES_FILE = join(__dirname, "../data/recipes.json");

// Type for recipe from API
interface ApiRecipeResponse {
  _id: string;
  title: string;
  description: string;
  ratings: number[];
  imageUrl: string;
  price: number;
  categories: string[];
  instructions: string[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    _id?: string;
  }[];
  avgRating?: number | null;
}

// Type for recipe from JSON file
interface JsonRecipe {
  id: string;
  title: string;
  description: string;
  ratings: number[];
  imageUrl: string;
  timeInMins: string;
  difficulty: string;
  price: number;
  categories: string[];
  instructions: string[];
  ingredients: {
    name: string;
    amount: number | null;
    unit: string;
  }[];
}

// Type for API recipe
interface ApiRecipe {
  title: string;
  description: string;
  ratings: number[];
  imageUrl: string;
  price: number;
  categories: string[];
  instructions: string[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}

// Function to transform recipe from JSON format to API format
function transformRecipe(jsonRecipe: JsonRecipe): ApiRecipe {
  // Filter ingredients with null amount
  const validIngredients = jsonRecipe.ingredients
    .filter(ing => ing.amount !== null)
    .map(ing => ({
      name: ing.name,
      amount: ing.amount as number,
      unit: ing.unit || ""
    }));

  return {
    title: jsonRecipe.title,
    description: jsonRecipe.description,
    ratings: jsonRecipe.ratings || [],
    imageUrl: jsonRecipe.imageUrl,
    price: jsonRecipe.price,
    categories: jsonRecipe.categories,
    instructions: jsonRecipe.instructions,
    ingredients: validIngredients
  };
}

// Function to fetch all existing recipes from server
async function fetchExistingRecipes(): Promise<Map<string, ApiRecipeResponse>> {
  try {
    console.log("🔄 Fetching existing recipes from server...");
    const response = await axios.get(API_URL);
    const recipes: ApiRecipeResponse[] = response.data;

    // Create Map with title (lowercase) as key for fast lookup
    const recipesMap = new Map<string, ApiRecipeResponse>();
    recipes.forEach((recipe) => {
      const key = recipe.title.toLowerCase().trim();
      recipesMap.set(key, recipe);
    });

    console.log(`✅ Found ${recipes.length} existing recipes on server`);
    return recipesMap;
  } catch (error) {
    console.error("❌ Error fetching existing recipes:", error);
    // Return empty Map if error occurs
    return new Map<string, ApiRecipeResponse>();
  }
}

// Function to create or update a recipe
async function createOrUpdateRecipe(
  recipe: ApiRecipe,
  existingRecipeId: string | undefined,
  index: number,
  total: number
): Promise<boolean> {
  try {
    if (existingRecipeId) {
      // Recipe exists - update it
      console.log(`\n[${index + 1}/${total}] 🔄 Updating: ${recipe.title}`);
      const response = await axios.patch(`${API_URL}/${existingRecipeId}`, recipe, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log(`   ✅ Successfully updated! (ID: ${existingRecipeId})`);
        return true;
      } else {
        console.log(`   ⚠️  Unexpected status: ${response.status}`);
        return false;
      }
    } else {
      // Recipe doesn't exist - create it
      console.log(`\n[${index + 1}/${total}] 📤 Creating: ${recipe.title}`);
      const response = await axios.post(API_URL, recipe, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201 || response.status === 200) {
        console.log(`   ✅ Successfully created! (ID: ${response.data._id || response.data.id || "N/A"})`);
        return true;
      } else {
        console.log(`   ⚠️  Unexpected status: ${response.status}`);
        return false;
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const action = existingRecipeId ? "update" : "create";
        console.error(`   ❌ Error ${error.response.status} while trying to ${action}: ${error.response.statusText}`);
        if (error.response.data) {
          console.error(`   📄 Details:`, JSON.stringify(error.response.data, null, 2));
        }
      } else {
        console.error(`   ❌ Network error: ${error.message}`);
      }
    } else {
      console.error(`   ❌ Error:`, error);
    }
    return false;
  }
}

// Main function
async function sendRecipesToServer() {
  try {
    console.log("📂 Reading recipes.json file...");
    
    // Read file
    const fileContent = readFileSync(RECIPES_FILE, "utf-8");
    const jsonRecipes: JsonRecipe[] = JSON.parse(fileContent);
    
    console.log(`✅ Found recipes: ${jsonRecipes.length}`);
    console.log(`🌐 API URL: ${API_URL}`);
    console.log("\n" + "=".repeat(60));

    // Fetch existing recipes from server
    const existingRecipesMap = await fetchExistingRecipes();
    
    console.log("\n" + "=".repeat(60));

    // Transform recipes
    const apiRecipes = jsonRecipes.map(transformRecipe);
    
    // Process each recipe (create or update)
    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < apiRecipes.length; i++) {
      const recipe = apiRecipes[i];
      if (!recipe) continue;
      
      // Check if recipe already exists by title (case-insensitive)
      const recipeKey = recipe.title.toLowerCase().trim();
      const existingRecipe = existingRecipesMap.get(recipeKey);
      const existingRecipeId = existingRecipe?._id;
      
      const success = await createOrUpdateRecipe(recipe, existingRecipeId, i, apiRecipes.length);
      
      if (success) {
        if (existingRecipeId) {
          updatedCount++;
        } else {
          createdCount++;
        }
      } else {
        errorCount++;
      }
      
      // Small delay between requests to avoid overloading the server
      if (i < apiRecipes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Final statistics
    console.log("\n" + "=".repeat(60));
    console.log("\n📊 FINAL STATISTICS:");
    console.log(`   ✅ Created: ${createdCount}`);
    console.log(`   🔄 Updated: ${updatedCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📦 Total recipes processed: ${jsonRecipes.length}`);
    
    if (createdCount + updatedCount === jsonRecipes.length) {
      console.log("\n🎉 All recipes successfully processed!");
    } else {
      console.log(`\n⚠️  Processed ${createdCount + updatedCount} out of ${jsonRecipes.length} recipes.`);
    }

  } catch (error) {
    console.error("\n❌ Critical error:");
    if (error instanceof Error) {
      console.error("Message:", error.message);
      if (error instanceof SyntaxError) {
        console.error("Possible invalid JSON format in recipes.json file.");
      }
    } else {
      console.error(String(error));
    }
    process.exit(1);
  }
}

// Run the script
sendRecipesToServer();

