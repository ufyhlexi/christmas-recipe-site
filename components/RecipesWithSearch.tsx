"use client";

import { useMemo } from "react";
import { RecipeCard } from "./RecipeCard";
import { searchRecipes } from "@/lib/searchUtils";
import { useSearch } from "@/contexts/SearchContext";
import type { Recipe } from "@/lib/types";

interface RecipesWithSearchProps {
  recipes: Recipe[];
}

export default function RecipesWithSearch({ recipes }: RecipesWithSearchProps) {
  const { searchTerm } = useSearch();

  // Filter recipes based on search term
  const filteredRecipes = useMemo(() => {
    return searchRecipes(recipes, searchTerm);
  }, [recipes, searchTerm]);

  // If no search term, show all recipes
  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  return (
    <section id="recipes" className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Recipes Grid */}
        {recipesToDisplay.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recipesToDisplay.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : searchTerm ? (
          <div 
            className="relative min-h-[400px] flex items-center justify-center text-center py-12 px-4"
            style={{
              backgroundImage: 'url(/page-eaten.svg)',
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/80"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-gray-500 text-4xl font-normal">
                Inga recept hittades för &quot;{searchTerm}&quot;. Prova med ett annat sökord.
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

