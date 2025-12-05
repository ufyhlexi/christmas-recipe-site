import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

async function testRatingFieldAfterPost() {
  try {
    console.log("🧪 Testing 'rating' Field After POST Request");
    console.log("=".repeat(60));
    
    // Step 1: Get a recipe
    console.log("\n📥 Step 1: Fetching all recipes...");
    const allRecipesResponse = await axios.get(API_URL);
    const allRecipes = allRecipesResponse.data;
    
    if (!allRecipes || allRecipes.length === 0) {
      console.log("❌ No recipes found");
      return;
    }
    
    const testRecipe = allRecipes[0];
    console.log(`✅ Found recipe: "${testRecipe.title}"`);
    console.log(`   ID: ${testRecipe._id}`);
    console.log(`   Current keys:`, Object.keys(testRecipe));
    console.log(`   Has 'rating' before POST?`, 'rating' in testRecipe);
    console.log(`   avgRating: ${testRecipe.avgRating ?? "null"}`);
    
    // Step 2: Send POST request with rating
    console.log(`\n📤 Step 2: Sending POST /recipes/${testRecipe._id}/ratings with rating: 5`);
    try {
      const postResponse = await axios.post(
        `${API_URL}/${testRecipe._id}/ratings`,
        { rating: 5 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("   Response status:", postResponse.status);
      console.log("   Response headers:", postResponse.headers);
      console.log("   Response data type:", typeof postResponse.data);
      
      if (postResponse.data) {
        if (typeof postResponse.data === 'string') {
          console.log("   Response (string):", postResponse.data);
          if (postResponse.data.trim() === '') {
            console.log("   ⚠️ Response is empty string");
          }
        } else if (typeof postResponse.data === 'object') {
          console.log("   Response (object):", JSON.stringify(postResponse.data, null, 2));
          console.log("   Response keys:", Object.keys(postResponse.data));
          
          if ('rating' in postResponse.data) {
            console.log("\n   ✅ 'rating' field in POST response!");
            console.log("      Value:", postResponse.data.rating);
            console.log("      Type:", typeof postResponse.data.rating);
            console.log("      Is array?", Array.isArray(postResponse.data.rating));
            if (Array.isArray(postResponse.data.rating)) {
              console.log("      Array length:", postResponse.data.rating.length);
              console.log("      Array contents:", postResponse.data.rating);
            }
          }
        }
      } else {
        console.log("   ⚠️ Response data is null/undefined");
      }
    } catch (postError) {
      console.log("   ❌ Error in POST request:");
      if (axios.isAxiosError(postError)) {
        console.log("      Status:", postError.response?.status);
        console.log("      Status text:", postError.response?.statusText);
        if (postError.response?.data) {
          console.log("      Response data:", JSON.stringify(postError.response.data, null, 2));
        }
        console.log("      Request URL:", postError.config?.url);
        console.log("      Request data:", postError.config?.data);
      } else {
        console.log("      Error:", postError);
      }
      return;
    }
    
    // Step 3: Wait a bit and fetch the recipe again
    console.log(`\n⏳ Step 3: Waiting 1 second before fetching updated recipe...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`📥 Fetching recipe again: GET /recipes/${testRecipe._id}`);
    const updatedResponse = await axios.get(`${API_URL}/${testRecipe._id}`);
    const updatedRecipe = updatedResponse.data;
    
    console.log("\n   Updated recipe keys:", Object.keys(updatedRecipe));
    console.log(`   Has 'rating' after POST?`, 'rating' in updatedRecipe);
    
    if ('rating' in updatedRecipe) {
      console.log("\n   ✅✅✅ 'rating' field EXISTS after POST!");
      console.log("      Value:", updatedRecipe.rating);
      console.log("      Type:", typeof updatedRecipe.rating);
      console.log("      Is array?", Array.isArray(updatedRecipe.rating));
      
      if (Array.isArray(updatedRecipe.rating)) {
        console.log("      Array length:", updatedRecipe.rating.length);
        console.log("      Array contents:", updatedRecipe.rating);
        console.log("\n      🎉🎉🎉 SUCCESS!");
        console.log("      'rating' is an array of numbers!");
        console.log("      We can use rating.length to get the count!");
        console.log("      Current count:", updatedRecipe.rating.length);
      } else {
        console.log("      ⚠️ 'rating' exists but is NOT an array");
      }
    } else {
      console.log("\n   ❌ 'rating' field still does NOT exist after POST");
      console.log("   Available fields:", Object.keys(updatedRecipe));
      console.log("   avgRating changed?", updatedRecipe.avgRating !== testRecipe.avgRating);
      console.log("   Old avgRating:", testRecipe.avgRating);
      console.log("   New avgRating:", updatedRecipe.avgRating);
    }
    
    // Step 4: Try adding another rating to see if array grows
    if ('rating' in updatedRecipe && Array.isArray(updatedRecipe.rating)) {
      console.log(`\n📤 Step 4: Adding another rating (4) to test if array grows...`);
      try {
        await axios.post(
          `${API_URL}/${testRecipe._id}/ratings`,
          { rating: 4 },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const secondUpdateResponse = await axios.get(`${API_URL}/${testRecipe._id}`);
        const secondUpdatedRecipe = secondUpdateResponse.data;
        
        if ('rating' in secondUpdatedRecipe && Array.isArray(secondUpdatedRecipe.rating)) {
          console.log("   ✅ Rating array after second POST:");
          console.log("      Length:", secondUpdatedRecipe.rating.length);
          console.log("      Contents:", secondUpdatedRecipe.rating);
          console.log("      Previous length:", updatedRecipe.rating.length);
          
          if (secondUpdatedRecipe.rating.length > updatedRecipe.rating.length) {
            console.log("\n      🎉 Array is growing! Ratings are being added!");
          }
        }
      } catch (error) {
        console.log("   ⚠️ Error adding second rating (this is OK)");
      }
    }
    
    // Step 5: Check if rating appears in GET /recipes list
    console.log(`\n📥 Step 5: Checking if 'rating' appears in GET /recipes list...`);
    const allRecipesAfterResponse = await axios.get(API_URL);
    const allRecipesAfter = allRecipesAfterResponse.data;
    const testRecipeInList = allRecipesAfter.find((r: any) => r._id === testRecipe._id);
    
    if (testRecipeInList) {
      console.log(`   Recipe found in list: "${testRecipeInList.title}"`);
      console.log("   Keys:", Object.keys(testRecipeInList));
      console.log("   Has 'rating'?", 'rating' in testRecipeInList);
      
      if ('rating' in testRecipeInList) {
        console.log("   ✅ 'rating' field EXISTS in GET /recipes list!");
        console.log("      Value:", testRecipeInList.rating);
        console.log("      Is array?", Array.isArray(testRecipeInList.rating));
        if (Array.isArray(testRecipeInList.rating)) {
          console.log("      Array length:", testRecipeInList.rating.length);
        }
      }
    }
    
  } catch (error) {
    console.error("\n❌ Error during test:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
    }
  }
}

testRatingFieldAfterPost();


