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
}

// Fetch all recipes from server
export async function fetchRecipes(): Promise<ApiRecipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
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
      next: { revalidate: 60 },
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

