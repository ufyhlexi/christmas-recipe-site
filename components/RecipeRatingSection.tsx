"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingInput from "./RatingInput";
import RatingDisplay from "./RatingDisplay";
import type { Recipe } from "@/lib/types";
import type { ApiRecipe } from "@/lib/api";
import { mergeRecipeData } from "@/lib/recipeUtils";

interface RecipeRatingSectionProps {
  recipe: Recipe;
}

export default function RecipeRatingSection({ recipe: initialRecipe }: RecipeRatingSectionProps) {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const router = useRouter();

  // Logging for debugging
  // console.log("📋 RecipeRatingSection Debug:", {
  //   recipeId: recipe.id,
  //   recipeTitle: recipe.title,
  //   currentAvgRating: recipe.avgRating,
  //   ratingsCount: recipe.ratings?.length || 0,
  // });

  const handleRatingUpdate = (updatedApiRecipe: ApiRecipe) => {
    // console.log("🔄 Rating updated, new API data:", {
    //   _id: updatedApiRecipe._id,
    //   title: updatedApiRecipe.title,
    //   ratings: updatedApiRecipe.ratings,
    //   avgRating: updatedApiRecipe.avgRating,
    // });

    // Обновляем локальное состояние с новыми данными
    const updatedRecipe = mergeRecipeData(updatedApiRecipe);
    setRecipe(updatedRecipe);
    
    // Обновляем страницу для синхронизации с сервером
    router.refresh();
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      {/* Display current rating */}
      {recipe.avgRating !== null && recipe.avgRating !== undefined && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <RatingDisplay
            rating={recipe.avgRating}
            ratingCount={recipe.ratings?.length || 0}
            size="large"
          />
        </div>
      )}

      {/* Rating input */}
      <RatingInput
        recipeId={recipe.id}
        currentRating={recipe.avgRating}
        ratingCount={recipe.ratings?.length || 0}
        onRatingUpdate={handleRatingUpdate}
      />
    </div>
  );
}

