import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

// Function to test adding rating to a specific recipe
async function testAddRating(recipeTitle: string, rating: number) {
  try {
    console.log(`\n🔍 Testing rating for recipe: "${recipeTitle}"`);
    console.log("📍 API URL:", API_URL);
    
    // Step 1: Get all recipes and find the target recipe
    console.log("\n📥 Step 1: Fetching all recipes...");
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
    
    console.log("✅ Recipe found!");
    console.log(`   Title: ${recipe.title}`);
    console.log(`   ID: ${recipe._id}`);
    console.log(`   Current ratings:`, recipe.ratings || []);
    console.log(`   Current avgRating: ${recipe.avgRating ?? "null"}`);
    
    // Step 2: Add rating
    console.log(`\n📤 Step 2: Adding rating ${rating} to recipe ID: ${recipe._id}`);
    const ratingResponse = await axios.post(
      `${API_URL}/${recipe._id}/ratings`,
      { rating },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("📥 Rating API Response Status:", ratingResponse.status);
    console.log("📥 Rating API Response Data:", JSON.stringify(ratingResponse.data, null, 2));
    
    // Step 3: Fetch updated recipe
    console.log(`\n📥 Step 3: Fetching updated recipe...`);
    const updatedResponse = await axios.get(`${API_URL}/${recipe._id}`);
    const updatedRecipe = updatedResponse.data;
    
    console.log("✅ Updated recipe data:");
    console.log(`   Title: ${updatedRecipe.title}`);
    console.log(`   ID: ${updatedRecipe._id}`);
    console.log(`   New ratings array:`, updatedRecipe.ratings || []);
    console.log(`   New avgRating: ${updatedRecipe.avgRating ?? "null"}`);
    console.log(`   Ratings count: ${updatedRecipe.ratings?.length || 0}`);
    
    // Step 4: Verify the rating was added to the correct recipe
    if (updatedRecipe._id === recipe._id) {
      console.log("\n✅ SUCCESS: Rating was added to the correct recipe!");
    } else {
      console.log("\n❌ ERROR: Rating was added to a different recipe!");
      console.log(`   Expected ID: ${recipe._id}`);
      console.log(`   Got ID: ${updatedRecipe._id}`);
    }
    
    // Step 5: Check if rating is in the array
    if (updatedRecipe.ratings && updatedRecipe.ratings.includes(rating)) {
      console.log(`✅ Rating ${rating} is in the ratings array`);
    } else {
      console.log(`⚠️ Rating ${rating} is NOT in the ratings array`);
    }
    
  } catch (error) {
    console.error("\n❌ Error during test:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      console.error("Request URL:", error.config?.url);
      console.error("Request data:", error.config?.data);
    }
  }
}

// Test with specific recipe
const recipeTitle = process.argv[2] || "Saftig sockerkaka";
const rating = parseInt(process.argv[3]) || 5;

console.log("🧪 Testing Rating System");
console.log("=" .repeat(60));
testAddRating(recipeTitle, rating);

