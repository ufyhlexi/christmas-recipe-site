import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

async function inspectApiStructure() {
  try {
    console.log("🔍 Inspecting API Response Structure");
    console.log("=".repeat(60));
    
    const response = await axios.get(API_URL);
    const recipes = response.data;
    
    if (!recipes || recipes.length === 0) {
      console.log("❌ No recipes found");
      return;
    }
    
    // Get first recipe to inspect structure
    const firstRecipe = recipes[0];
    
    console.log("\n📋 Recipe Object Structure:");
    console.log("Keys:", Object.keys(firstRecipe));
    console.log("\n📊 Full Recipe Object:");
    console.log(JSON.stringify(firstRecipe, null, 2));
    
    console.log("\n🔍 Rating-related fields:");
    console.log("  - ratings:", firstRecipe.ratings);
    console.log("  - ratings type:", typeof firstRecipe.ratings);
    console.log("  - ratings is array?", Array.isArray(firstRecipe.ratings));
    console.log("  - ratings length:", firstRecipe.ratings?.length);
    console.log("  - avgRating:", firstRecipe.avgRating);
    console.log("  - avgRating type:", typeof firstRecipe.avgRating);
    
    // Check if ratings exists and what it contains
    if (firstRecipe.ratings) {
      console.log("\n✅ 'ratings' field EXISTS");
      if (Array.isArray(firstRecipe.ratings)) {
        console.log("✅ 'ratings' is an ARRAY");
        console.log("   Array contents:", firstRecipe.ratings);
        console.log("   Array length:", firstRecipe.ratings.length);
      } else {
        console.log("❌ 'ratings' is NOT an array");
        console.log("   Type:", typeof firstRecipe.ratings);
      }
    } else {
      console.log("\n❌ 'ratings' field does NOT exist");
    }
    
    // Check a few more recipes to see if structure is consistent
    console.log("\n🔍 Checking 3 more recipes for consistency:");
    for (let i = 1; i < Math.min(4, recipes.length); i++) {
      const recipe = recipes[i];
      console.log(`\n  Recipe ${i + 1}: "${recipe.title}"`);
      console.log(`    - ratings exists: ${!!recipe.ratings}`);
      console.log(`    - ratings is array: ${Array.isArray(recipe.ratings)}`);
      console.log(`    - ratings length: ${recipe.ratings?.length || 0}`);
      console.log(`    - avgRating: ${recipe.avgRating ?? "null"}`);
    }
    
  } catch (error) {
    console.error("\n❌ Error inspecting API:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
    }
  }
}

inspectApiStructure();

