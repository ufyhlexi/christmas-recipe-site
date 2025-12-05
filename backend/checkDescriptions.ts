import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

interface ApiRecipe {
  _id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

async function checkDescriptions() {
  try {
    console.log("🔄 Checking descriptions from API...");
    console.log("📍 URL:", API_URL);
    console.log("\n" + "=".repeat(80));

    const response = await axios.get(API_URL);
    const recipes: ApiRecipe[] = response.data;

    console.log(`\n✅ Found ${recipes.length} recipes in API\n`);

    // Check descriptions for all recipes
    recipes.forEach((recipe, index) => {
      const descLength = recipe.description?.length || 0;
      const descPreview = recipe.description 
        ? (recipe.description.length > 60 
          ? recipe.description.substring(0, 60) + "..." 
          : recipe.description)
        : "NO DESCRIPTION";
      
      console.log(`\n[${index + 1}] ${recipe.title}`);
      console.log(`   Description length: ${descLength} characters`);
      console.log(`   Description: "${descPreview}"`);
      
      // Check if description seems truncated
      if (descLength > 0 && descLength < 50) {
        console.log(`   ⚠️  Short description (might be truncated or originally short)`);
      }
    });

    // Find recipes with long descriptions
    const longDescriptions = recipes.filter(r => (r.description?.length || 0) > 100);
    console.log("\n" + "=".repeat(80));
    console.log(`\n📊 Statistics:`);
    console.log(`   Total recipes: ${recipes.length}`);
    console.log(`   Recipes with long descriptions (>100 chars): ${longDescriptions.length}`);
    console.log(`   Recipes with short descriptions (<50 chars): ${recipes.filter(r => (r.description?.length || 0) > 0 && (r.description?.length || 0) < 50).length}`);
    console.log(`   Recipes without description: ${recipes.filter(r => !r.description || r.description.length === 0).length}`);

    // Show examples of long descriptions
    if (longDescriptions.length > 0) {
      console.log("\n" + "=".repeat(80));
      console.log("\n📝 Examples of long descriptions from API:");
      longDescriptions.slice(0, 3).forEach(recipe => {
        console.log(`\n   "${recipe.title}":`);
        console.log(`   "${recipe.description}"`);
        console.log(`   Length: ${recipe.description?.length} characters`);
      });
    }

    console.log("\n" + "=".repeat(80));
    console.log("\n✨ Check completed!");

  } catch (error) {
    console.error("\n❌ Error during check:");
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

checkDescriptions();

