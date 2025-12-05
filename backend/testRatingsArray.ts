import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

async function testRatingsArray() {
  try {
    console.log("🧪 Testing Ratings Array in API");
    console.log("=".repeat(60));
    
    // Step 1: Get all recipes and check if ratings field exists
    console.log("\n📥 Step 1: Fetching all recipes...");
    const allRecipesResponse = await axios.get(API_URL);
    const allRecipes = allRecipesResponse.data;
    
    if (!allRecipes || allRecipes.length === 0) {
      console.log("❌ No recipes found");
      return;
    }
    
    const firstRecipe = allRecipes[0];
    console.log(`\n✅ Found ${allRecipes.length} recipes`);
    console.log(`\n📋 First recipe: "${firstRecipe.title}"`);
    console.log("   All keys:", Object.keys(firstRecipe));
    console.log("   Has 'ratings' key?", 'ratings' in firstRecipe);
    console.log("   Has 'rating' key?", 'rating' in firstRecipe);
    console.log("   Has 'ratingsCount' key?", 'ratingsCount' in firstRecipe);
    
    if (firstRecipe.ratings !== undefined) {
      console.log("\n✅ 'ratings' field EXISTS!");
      console.log("   Value:", firstRecipe.ratings);
      console.log("   Type:", typeof firstRecipe.ratings);
      console.log("   Is array?", Array.isArray(firstRecipe.ratings));
      if (Array.isArray(firstRecipe.ratings)) {
        console.log("   Array length:", firstRecipe.ratings.length);
        console.log("   Array contents:", firstRecipe.ratings);
      }
    } else if (firstRecipe.rating !== undefined) {
      console.log("\n✅ 'rating' field EXISTS!");
      console.log("   Value:", firstRecipe.rating);
      console.log("   Type:", typeof firstRecipe.rating);
      console.log("   Is array?", Array.isArray(firstRecipe.rating));
      if (Array.isArray(firstRecipe.rating)) {
        console.log("   Array length:", firstRecipe.rating.length);
        console.log("   Array contents:", firstRecipe.rating);
      }
    } else {
      console.log("\n❌ Neither 'ratings' nor 'rating' field found in GET /recipes");
    }
    
    // Step 2: Get single recipe by ID
    console.log(`\n📥 Step 2: Fetching single recipe by ID: ${firstRecipe._id}`);
    const singleRecipeResponse = await axios.get(`${API_URL}/${firstRecipe._id}`);
    const singleRecipe = singleRecipeResponse.data;
    
    console.log("   All keys:", Object.keys(singleRecipe));
    console.log("   Has 'ratings' key?", 'ratings' in singleRecipe);
    console.log("   Has 'rating' key?", 'rating' in singleRecipe);
    
    if (singleRecipe.ratings !== undefined) {
      console.log("\n✅ 'ratings' field EXISTS in GET /recipes/{id}!");
      console.log("   Value:", singleRecipe.ratings);
      console.log("   Type:", typeof singleRecipe.ratings);
      console.log("   Is array?", Array.isArray(singleRecipe.ratings));
      if (Array.isArray(singleRecipe.ratings)) {
        console.log("   Array length:", singleRecipe.ratings.length);
        console.log("   Array contents:", singleRecipe.ratings);
      }
    } else if (singleRecipe.rating !== undefined) {
      console.log("\n✅ 'rating' field EXISTS in GET /recipes/{id}!");
      console.log("   Value:", singleRecipe.rating);
      console.log("   Type:", typeof singleRecipe.rating);
      console.log("   Is array?", Array.isArray(singleRecipe.rating));
      if (Array.isArray(singleRecipe.rating)) {
        console.log("   Array length:", singleRecipe.rating.length);
        console.log("   Array contents:", singleRecipe.rating);
      }
    } else {
      console.log("\n❌ Neither 'ratings' nor 'rating' field found in GET /recipes/{id}");
    }
    
    // Step 3: Try to add a rating and see what the response contains
    console.log(`\n📤 Step 3: Adding rating 5 to recipe: ${firstRecipe._id}`);
    try {
      const ratingResponse = await axios.post(
        `${API_URL}/${firstRecipe._id}/ratings`,
        { rating: 5 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("   Response status:", ratingResponse.status);
      console.log("   Response data:", JSON.stringify(ratingResponse.data, null, 2));
      
      if (ratingResponse.data) {
        console.log("   Response keys:", Object.keys(ratingResponse.data));
        if (ratingResponse.data.ratings !== undefined) {
          console.log("\n✅ 'ratings' field EXISTS in POST response!");
          console.log("   Value:", ratingResponse.data.ratings);
          console.log("   Is array?", Array.isArray(ratingResponse.data.ratings));
          if (Array.isArray(ratingResponse.data.ratings)) {
            console.log("   Array length:", ratingResponse.data.ratings.length);
          }
        } else if (ratingResponse.data.rating !== undefined) {
          console.log("\n✅ 'rating' field EXISTS in POST response!");
          console.log("   Value:", ratingResponse.data.rating);
        } else {
          console.log("\n⚠️ POST response doesn't contain 'ratings' or 'rating' field");
        }
      } else {
        console.log("\n⚠️ POST response is empty");
      }
    } catch (error) {
      console.log("\n⚠️ Error adding rating (this is OK for testing):");
      if (axios.isAxiosError(error)) {
        console.log("   Status:", error.response?.status);
        console.log("   Response:", error.response?.data);
      }
    }
    
    // Step 4: Fetch the recipe again after adding rating to see if ratings array appears
    console.log(`\n📥 Step 4: Fetching recipe again after rating...`);
    const updatedRecipeResponse = await axios.get(`${API_URL}/${firstRecipe._id}`);
    const updatedRecipe = updatedRecipeResponse.data;
    
    console.log("   All keys:", Object.keys(updatedRecipe));
    if (updatedRecipe.ratings !== undefined) {
      console.log("\n✅ 'ratings' field EXISTS after POST!");
      console.log("   Value:", updatedRecipe.ratings);
      console.log("   Type:", typeof updatedRecipe.ratings);
      console.log("   Is array?", Array.isArray(updatedRecipe.ratings));
      if (Array.isArray(updatedRecipe.ratings)) {
        console.log("   Array length:", updatedRecipe.ratings.length);
        console.log("   Array contents:", updatedRecipe.ratings);
        console.log("\n🎉 SUCCESS: ratings array exists and contains numbers!");
        console.log("   We can use ratings.length to display the count!");
      }
    } else if (updatedRecipe.rating !== undefined) {
      console.log("\n✅ 'rating' field EXISTS after POST!");
      console.log("   Value:", updatedRecipe.rating);
      console.log("   Type:", typeof updatedRecipe.rating);
      console.log("   Is array?", Array.isArray(updatedRecipe.rating));
      if (Array.isArray(updatedRecipe.rating)) {
        console.log("   Array length:", updatedRecipe.rating.length);
        console.log("   Array contents:", updatedRecipe.rating);
        console.log("\n🎉 SUCCESS: rating array exists and contains numbers!");
        console.log("   We can use rating.length to display the count!");
      }
    } else {
      console.log("\n❌ Still no 'ratings' or 'rating' field after POST");
    }
    
    // Step 5: Check a few more recipes to see if any have ratings
    console.log("\n📊 Step 5: Checking other recipes for ratings field...");
    let recipesWithRatings = 0;
    for (let i = 0; i < Math.min(5, allRecipes.length); i++) {
      const recipe = allRecipes[i];
      if (recipe.ratings !== undefined && Array.isArray(recipe.ratings)) {
        recipesWithRatings++;
        console.log(`   Recipe "${recipe.title}": has ratings array (length: ${recipe.ratings.length})`);
      } else if (recipe.rating !== undefined && Array.isArray(recipe.rating)) {
        recipesWithRatings++;
        console.log(`   Recipe "${recipe.title}": has rating array (length: ${recipe.rating.length})`);
      }
    }
    console.log(`\n   Found ${recipesWithRatings} recipes with ratings/rating array`);
    
  } catch (error) {
    console.error("\n❌ Error during test:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
    }
  }
}

testRatingsArray();


