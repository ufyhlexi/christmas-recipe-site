import axios from "axios";

const API_URL = "https://grupp1-xjvta.reky.se/recipes";

async function checkSpecificRecipe() {
  try {
    console.log("🔄 Checking specific recipe from API...");
    console.log("📍 URL:", API_URL);
    console.log("\n" + "=".repeat(80));

    const response = await axios.get(API_URL);
    const recipes: any[] = response.data;

    // Find "Kläddig kladdkaka"
    const kladdkaka = recipes.find(r => 
      r.title.toLowerCase().includes("kladdkaka") || 
      r.title.toLowerCase().includes("kläddig")
    );

    if (kladdkaka) {
      console.log("\n✅ Found recipe in API:");
      console.log(`   Title: "${kladdkaka.title}"`);
      console.log(`   Description length: ${kladdkaka.description?.length || 0} characters`);
      console.log(`   Description: "${kladdkaka.description || 'NO DESCRIPTION'}"`);
      console.log(`   ID: ${kladdkaka._id}`);
    } else {
      console.log("\n❌ Recipe 'Kläddig kladdkaka' not found in API");
      console.log("\nAvailable recipes:");
      recipes.forEach(r => console.log(`   - ${r.title}`));
    }

    // Also check "Saftig sockerkaka"
    const sockerkaka = recipes.find(r => 
      r.title.toLowerCase().includes("sockerkaka") || 
      r.title.toLowerCase().includes("saftig")
    );

    if (sockerkaka) {
      console.log("\n" + "=".repeat(80));
      console.log("\n✅ Found recipe in API:");
      console.log(`   Title: "${sockerkaka.title}"`);
      console.log(`   Description length: ${sockerkaka.description?.length || 0} characters`);
      console.log(`   Description: "${sockerkaka.description || 'NO DESCRIPTION'}"`);
      console.log(`   ID: ${sockerkaka._id}`);
    }

    console.log("\n" + "=".repeat(80));

  } catch (error) {
    console.error("\n❌ Error:");
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
    } else {
      console.error(error);
    }
  }
}

checkSpecificRecipe();

