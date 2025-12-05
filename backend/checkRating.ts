import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

// Function to check rating for a specific recipe
async function checkRecipeRating(recipeTitle: string) {
  try {
    console.log(`\n🔍 Checking rating for recipe: "${recipeTitle}"`);
    console.log("📍 URL:", API_URL);
    
    const response = await axios.get(API_URL);
    const recipes = response.data;
    
    // Find recipe by title (case-insensitive)
    const recipe = recipes.find((r: any) => 
      r.title.toLowerCase().includes(recipeTitle.toLowerCase())
    );
    
    if (!recipe) {
      console.log(`❌ Recipe "${recipeTitle}" not found`);
      return;
    }
    
    // console.log("\n✅ Recipe found!");
    // console.log(`   Title: ${recipe.title}`);
    // console.log(`   ID: ${recipe._id}`);
    // console.log(`   Ratings array:`, recipe.ratings || []);
    // console.log(`   Ratings count: ${recipe.ratings?.length || 0}`);
    // console.log(`   Average rating: ${recipe.avgRating ?? "Not calculated"}`);
    
    if (recipe.ratings && recipe.ratings.length > 0) {
      const sum = recipe.ratings.reduce((a: number, b: number) => a + b, 0);
      const calculatedAvg = sum / recipe.ratings.length;
      console.log(`   Calculated average: ${calculatedAvg.toFixed(2)}`);
    }
    
  } catch (error) {
    console.error("\n❌ Error checking recipe:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
    }
  }
}

// Check specific recipe
const recipeTitle = process.argv[2] || "Saftig sockerkaka";
checkRecipeRating(recipeTitle);

