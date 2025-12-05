import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchRecipeById, fetchRecipes } from "@/lib/api";
import { mergeRecipeData, mergeRecipesData } from "@/lib/recipeUtils";
import { Recipe } from "@/lib/types";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { RecipeCard } from "@/components/RecipeCard";
import RecipeRatingSection from "@/components/RecipeRatingSection";
import CommentsSection from "@/components/CommentsSection";
import { CiClock2 } from "react-icons/ci";
import { PiCookingPotDuotone, PiCookingPot } from "react-icons/pi";
import {
  IoArrowBack,
  IoPricetagsOutline,
  IoListOutline,
} from "react-icons/io5";
import RatingDisplay from "@/components/RatingDisplay";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

// Function to get recommended recipes from the same category
function getRecommendedRecipes(
  allRecipes: Recipe[],
  currentRecipeId: string,
  currentCategories: string[],
  maxCount: number = 4
): Recipe[] {
  // If no categories, return empty array
  if (!currentCategories || currentCategories.length === 0) {
    return [];
  }

  // Filter recipes that:
  // 1. Are not the current recipe
  // 2. Have categories
  // 3. Share at least one category with the current recipe
  const recommended = allRecipes
    .filter((recipe) => {
      if (recipe.id === currentRecipeId) return false;
      if (!recipe.categories || recipe.categories.length === 0) return false;
      // Check if recipes share at least one category
      return recipe.categories.some((category: string) =>
        currentCategories.includes(category)
      );
    })
    .slice(0, maxCount); // Limit to maxCount recipes

  return recommended;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;

  // Logging for debugging
  // console.log("🔍 Recipe Page Debug:", {
  //   urlId: id,
  //   urlPath: `/recipe/${id}`,
  // });

  // Fetch recipe from API using the ID from URL
  const apiRecipe = await fetchRecipeById(id);

  // If recipe not found, show 404 page
  if (!apiRecipe) {
    notFound();
  }

  // Logging to check ID compliance
  // console.log("📋 Fetched Recipe Debug:", {
  //   urlId: id,
  //   apiId: apiRecipe._id,
  //   title: apiRecipe.title,
  //   idsMatch: id === apiRecipe._id,
  // });

  // Transform API data to Recipe format
  const recipe = mergeRecipeData(apiRecipe);

  // console.log("✅ Merged Recipe Debug:", {
  //   recipeId: recipe.id,
  //   recipeTitle: recipe.title,
  //   idsMatch: id === recipe.id,
  // });

  // Fetch all recipes for recommendations
  let recommendedRecipes: Recipe[] = [];
  try {
    const allApiRecipes = await fetchRecipes();
    const allRecipes = mergeRecipesData(allApiRecipes);
    recommendedRecipes = getRecommendedRecipes(
      allRecipes,
      recipe.id,
      recipe.categories,
      4
    );
  } catch (error) {
    console.error("Error fetching recipes for recommendations:", error);
  }

  return (
    <>
      <Header hideSearch={false} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-[#d32f2f] transition-colors mb-6 group"
          >
            <IoArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Tillbaka till startsidan</span>
          </Link>

          {/* Recipe Card - Image on left, info on right */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row">
              {/* Image - Left side */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[400px]">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content - Right side */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                {/* Title */}
                <div className="mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {recipe.title}
                  </h1>

                  {/* Description */}
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {recipe.description}
                  </p>
                  <div className="min-h-[35px] flex items-center max-[450px]:justify-start py-2">
                    <RatingDisplay
                      rating={recipe.avgRating}
                      ratingCount={recipe.ratings?.length || 0}
                      size="small"
                    />
                  </div>
                </div>

                {/* Recipe Meta Info with Icons */}
                <div className="flex flex-col gap-3 mt-6">
                  {recipe.timeInMins && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <CiClock2 className="text-xl text-gray-600" />
                      <span className="font-medium">{recipe.timeInMins}</span>
                    </div>
                  )}
                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <IoListOutline className="text-xl text-gray-600" />
                      <span className="font-medium">
                        {recipe.ingredients.length} ingredienser
                      </span>
                    </div>
                  )}
                  {recipe.difficulty && (
                    <div className="flex items-center gap-3 text-gray-700">
                      {recipe.difficulty === "Medel" ? (
                        <PiCookingPotDuotone className="text-xl text-gray-600" />
                      ) : (
                        <PiCookingPot className="text-xl text-gray-600" />
                      )}
                      <span className="font-medium">{recipe.difficulty}</span>
                    </div>
                  )}
                  {recipe.price && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <IoPricetagsOutline className="text-xl text-gray-600" />
                      <span className="font-medium">{recipe.price} kr</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ingredienser
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-green-600">•</span>
                    <span>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Instruktioner
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#d32f2f] text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="flex-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {/* Rating Section */}
          <RecipeRatingSection recipe={recipe} />

          {/* Comments Section */}
          <CommentsSection recipeId={recipe.id} />

          {/* Categories */}
          {recipe.categories && recipe.categories.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Kategorier
              </h2>
              <div className="flex flex-wrap gap-2">
                {recipe.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Recipes */}
          {recommendedRecipes.length > 0 && (
            <div className="mt-12 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Rekommenderade recept
              </h2>
              <div className="grid max-[450px]:grid-cols-1 grid-cols-2 min-[769px]:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                {recommendedRecipes.map((recommendedRecipe) => (
                  <RecipeCard
                    key={recommendedRecipe.id}
                    recipe={recommendedRecipe}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
