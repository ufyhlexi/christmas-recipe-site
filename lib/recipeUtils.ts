// Utilities for merging data from API and local JSON (hybrid approach)
// Main data from API, difficulty and timeInMins from local JSON

import { Recipe } from "./types";
import { ApiRecipe } from "./api";
import recipesMetadata from "@/data/recipes.json";

// Type for recipe metadata from local JSON
interface RecipeMetadata {
  id: string;
  title: string;
  difficulty: string;
  timeInMins: string;
}

// Create Map for fast metadata lookup by title
const metadataMap = new Map<string, RecipeMetadata>();

// Initialize Map with metadata from local JSON
(recipesMetadata as RecipeMetadata[]).forEach((recipe) => {
  metadataMap.set(recipe.title.toLowerCase().trim(), recipe);
});

/**
 * Merges recipe data from API with metadata from local JSON
 * Main data comes from API, difficulty and timeInMins from local JSON
 * @param apiRecipe - Recipe from API
 * @returns Recipe with merged data
 */
export function mergeRecipeData(apiRecipe: ApiRecipe): Recipe {
  // Find metadata by recipe title (case-insensitive)
  const metadata = metadataMap.get(apiRecipe.title.toLowerCase().trim());

  // Transform ingredients from API format to Recipe format
  const ingredients = apiRecipe.ingredients.map((ing) => ({
    name: ing.name,
    amount: ing.amount,
    unit: ing.unit,
  }));

  // Merge data
  const mergedRecipe: Recipe = {
    id: apiRecipe._id, // Use _id from API as id (MongoDB uses _id as primary key)
    title: apiRecipe.title,
    // Description comes from API (API stores full descriptions correctly)
    description: apiRecipe.description || "",
    ratings: apiRecipe.ratings || [],
    avgRating: apiRecipe.avgRating ?? null,
    imageUrl: apiRecipe.imageUrl,
    price: apiRecipe.price,
    categories: apiRecipe.categories || [],
    instructions: apiRecipe.instructions || [],
    ingredients: ingredients,
    // Use metadata from local JSON for difficulty and timeInMins (if found)
    // Otherwise use API data if available, or defaults
    difficulty: metadata?.difficulty || apiRecipe.difficulty || "Medel",
    timeInMins: metadata?.timeInMins || (apiRecipe.timeInMins ? `${apiRecipe.timeInMins} min` : "30 min"),
  };

  return mergedRecipe;
}

/**
 * Merges array of recipes from API with metadata from local JSON
 * @param apiRecipes - Array of recipes from API
 * @returns Array of recipes with merged data
 */
export function mergeRecipesData(apiRecipes: ApiRecipe[]): Recipe[] {
  return apiRecipes.map(mergeRecipeData);
}
