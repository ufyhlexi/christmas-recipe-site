import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

async function testRatingField() {
  try {
    console.log("🧪 Testing 'rating' Field in API");
    console.log("=".repeat(60));
    
    // Step 1: Get all recipes and check for 'rating' field
    console.log("\n📥 Step 1: Fetching all recipes...");
    const allRecipesResponse = await axios.get(API_URL);
    const allRecipes = allRecipesResponse.data;
    
    if (!allRecipes || allRecipes.length === 0) {
      console.log("❌ No recipes found");
      return;
    }
    
    console.log(`✅ Found ${allRecipes.length} recipes\n`);
    
    // Check first few recipes
    for (let i = 0; i < Math.min(5, allRecipes.length); i++) {
      const recipe = allRecipes[i];
      console.log(`📋 Recipe ${i + 1}: "${recipe.title}"`);
      console.log("   All keys:", Object.keys(recipe));
      
      // Check for 'rating' field (singular)
      if ('rating' in recipe) {
        console.log("   ✅ 'rating' field EXISTS!");
        console.log("      Value:", recipe.rating);
        console.log("      Type:", typeof recipe.rating);
        console.log("      Is array?", Array.isArray(recipe.rating));
        if (Array.isArray(recipe.rating)) {
          console.log("      Array length:", recipe.rating.length);
          console.log("      Array contents:", recipe.rating);
          console.log("      🎉 SUCCESS: 'rating' is an array of numbers!");
        } else if (typeof recipe.rating === 'number') {
          console.log("      ⚠️ 'rating' is a number, not an array");
        } else if (typeof recipe.rating === 'object' && recipe.rating !== null) {
          console.log("      ⚠️ 'rating' is an object:", recipe.rating);
        }
      } else {
        console.log("   ❌ 'rating' field does NOT exist");
      }
      
      // Also check avgRating for comparison
      if ('avgRating' in recipe) {
        console.log("   avgRating:", recipe.avgRating);
      }
      console.log("");
    }
    
    // Step 2: Get single recipe by ID
    const firstRecipe = allRecipes[0];
    console.log(`\n📥 Step 2: Fetching single recipe by ID: ${firstRecipe._id}`);
    const singleRecipeResponse = await axios.get(`${API_URL}/${firstRecipe._id}`);
    const singleRecipe = singleRecipeResponse.data;
    
    console.log("   All keys:", Object.keys(singleRecipe));
    if ('rating' in singleRecipe) {
      console.log("\n   ✅ 'rating' field EXISTS in GET /recipes/{id}!");
      console.log("      Value:", singleRecipe.rating);
      console.log("      Type:", typeof singleRecipe.rating);
      console.log("      Is array?", Array.isArray(singleRecipe.rating));
      if (Array.isArray(singleRecipe.rating)) {
        console.log("      Array length:", singleRecipe.rating.length);
        console.log("      Array contents:", singleRecipe.rating);
        console.log("\n      🎉 SUCCESS: We can use rating.length for count!");
      }
    } else {
      console.log("\n   ❌ 'rating' field does NOT exist in GET /recipes/{id}");
    }
    
    // Step 3: Try to add a rating and check response
    console.log(`\n📤 Step 3: Adding rating 4 to recipe: ${firstRecipe._id}`);
    try {
      const ratingResponse = await axios.post(
        `${API_URL}/${firstRecipe._id}/ratings`,
        { rating: 4 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("   Response status:", ratingResponse.status);
      console.log("   Response data type:", typeof ratingResponse.data);
      
      if (ratingResponse.data) {
        if (typeof ratingResponse.data === 'string') {
          console.log("   Response is string:", ratingResponse.data);
        } else {
          console.log("   Response data:", JSON.stringify(ratingResponse.data, null, 2));
          console.log("   Response keys:", Object.keys(ratingResponse.data));
          
          if ('rating' in ratingResponse.data) {
            console.log("\n   ✅ 'rating' field in POST response!");
            console.log("      Value:", ratingResponse.data.rating);
            console.log("      Is array?", Array.isArray(ratingResponse.data.rating));
            if (Array.isArray(ratingResponse.data.rating)) {
              console.log("      Array length:", ratingResponse.data.rating.length);
            }
          }
        }
      } else {
        console.log("   ⚠️ POST response is empty");
      }
    } catch (error) {
      console.log("   ⚠️ Error (this is OK for testing):");
      if (axios.isAxiosError(error)) {
        console.log("      Status:", error.response?.status);
        if (error.response?.data) {
          console.log("      Response:", JSON.stringify(error.response.data, null, 2));
        }
      }
    }
    
    // Step 4: Fetch recipe again after POST
    console.log(`\n📥 Step 4: Fetching recipe again after POST...`);
    const updatedResponse = await axios.get(`${API_URL}/${firstRecipe._id}`);
    const updatedRecipe = updatedResponse.data;
    
    console.log("   All keys:", Object.keys(updatedRecipe));
    if ('rating' in updatedRecipe) {
      console.log("\n   ✅ 'rating' field EXISTS after POST!");
      console.log("      Value:", updatedRecipe.rating);
      console.log("      Type:", typeof updatedRecipe.rating);
      console.log("      Is array?", Array.isArray(updatedRecipe.rating));
      if (Array.isArray(updatedRecipe.rating)) {
        console.log("      Array length:", updatedRecipe.rating.length);
        console.log("      Array contents:", updatedRecipe.rating);
        console.log("\n      🎉 SUCCESS: 'rating' is an array!");
        console.log("      We can use rating.length to display count!");
      }
    } else {
      console.log("\n   ❌ 'rating' field still does NOT exist after POST");
      console.log("   Available fields:", Object.keys(updatedRecipe));
    }
    
  } catch (error) {
    console.error("\n❌ Error during test:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
    }
  }
}

testRatingField();


