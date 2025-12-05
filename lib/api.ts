// API service for working with recipes

const API_BASE_URL = "https://grupp1-xjvta.reky.se";

// Type for recipe from API
export interface ApiRecipe {
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
  timeInMins?: number;
  difficulty?: string;
}

// Fetch all recipes from server
export async function fetchRecipes(): Promise<ApiRecipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      next: { revalidate: 0 }, // No cache - always fetch fresh data
      cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

// Fetch single recipe by ID
export async function fetchRecipeById(id: string): Promise<ApiRecipe | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      next: { revalidate: 0 }, // No cache - always fetch fresh data
      cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Recipe not found
      }
      throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null; // Return null on error
  }
}

// Add rating to recipe
export async function addRecipeRating(
  recipeId: string,
  rating: number
): Promise<ApiRecipe> {
  try {
    // console.log(`📤 Sending rating ${rating} to recipe ${recipeId}`);
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);
      throw new Error(`Failed to add rating: ${response.statusText}`);
    }

    // Проверяем, есть ли тело ответа
    const responseText = await response.text();
    console.log("📥 API Response:", response.status, responseText);

    // Если ответ пустой, получаем обновленный рецепт отдельным запросом
    if (!responseText || responseText.trim() === "") {
      // console.log("⚠️ Empty response, fetching updated recipe...");
      const updatedRecipe = await fetchRecipeById(recipeId);
      if (!updatedRecipe) {
        throw new Error("Failed to fetch updated recipe after rating");
      }
      // console.log("✅ Rating saved successfully (fetched updated recipe):", {
      //   ratings: updatedRecipe.ratings,
      //   avgRating: updatedRecipe.avgRating,
      //   ratingsCount: updatedRecipe.ratings?.length || 0,
      // });
      return updatedRecipe;
    }

    // Пытаемся распарсить JSON
    let data: ApiRecipe;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON response:", parseError);
      // Если не удалось распарсить, получаем обновленный рецепт
      const updatedRecipe = await fetchRecipeById(recipeId);
      if (!updatedRecipe) {
        throw new Error("Failed to fetch updated recipe after rating");
      }
      return updatedRecipe;
    }

    // console.log("✅ Rating saved successfully:", {
    //   ratings: data.ratings,
    //   avgRating: data.avgRating,
    //   ratingsCount: data.ratings?.length || 0,
    // });
    return data;
  } catch (error) {
    console.error("Error adding rating:", error);
    throw error;
  }
}

