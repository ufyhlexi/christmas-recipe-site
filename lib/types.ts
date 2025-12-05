export interface Recipe {
  id: string;
  title: string;
  description: string;
  ratings: number[]; 
  avgRating?: number | null;
  imageUrl: string;
  difficulty: string;
  timeInMins: string;
  price: number;
  categories: string[];
  instructions: string[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  _id?: string; // Optional field from API
}


export interface Comment {
  id: string;
  recipeId?: string;
  name: string;
  comment: string; // Changed from 'message' to 'comment' to match API
  createdAt?: string;      
}

export interface RecipeCard {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}