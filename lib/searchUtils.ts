// Search utility functions for recipes

import { Recipe } from "./types";

/**
 * Search recipes by search term
 * Searches in title, description, categories, and ingredients
 * @param recipes - Array of recipes to search
 * @param searchTerm - Search term (case-insensitive)
 * @returns Filtered array of recipes
 */
export function searchRecipes(recipes: Recipe[], searchTerm: string): Recipe[] {
  if (!searchTerm.trim()) {
    return recipes;
  }

  const searchLower = searchTerm.toLowerCase().trim();

  return recipes.filter((recipe) => {
    // Search in title
    if (recipe.title.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Search in description
    if (recipe.description?.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Search in categories
    if (recipe.categories?.some((category) => 
      category.toLowerCase().includes(searchLower)
    )) {
      return true;
    }

    // Search in ingredients
    if (recipe.ingredients?.some((ingredient) =>
      ingredient.name.toLowerCase().includes(searchLower)
    )) {
      return true;
    }

    return false;
  });
}

