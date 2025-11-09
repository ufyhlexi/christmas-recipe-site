// Utilities for merging data from API and local JSON (hybrid approach)

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
    id: apiRecipe._id, // Use _id from API as id
    title: apiRecipe.title,
    description: apiRecipe.description,
    ratings: apiRecipe.ratings || [],
    imageUrl: apiRecipe.imageUrl,
    price: apiRecipe.price,
    categories: apiRecipe.categories || [],
    instructions: apiRecipe.instructions || [],
    ingredients: ingredients,
    // Metadata from local JSON (if found)
    difficulty: metadata?.difficulty || "Medel", // Default value
    timeInMins: metadata?.timeInMins || "30 min", // Default value
  };

  return mergedRecipe;
}

/**
 * Merges array of recipes from API with metadata
 * @param apiRecipes - Array of recipes from API
 * @returns Array of recipes with merged data
 */
export function mergeRecipesData(apiRecipes: ApiRecipe[]): Recipe[] {
  return apiRecipes.map(mergeRecipeData);
}

