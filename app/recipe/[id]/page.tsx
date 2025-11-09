import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/lib/api";
import { mergeRecipeData } from "@/lib/recipeUtils";
import Image from "next/image";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  
  // Fetch recipe from API
  const apiRecipe = await fetchRecipeById(id);

  // If recipe not found, show 404 page
  if (!apiRecipe) {
    notFound();
  }

  // Merge with metadata from local JSON
  const recipe = mergeRecipeData(apiRecipe);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative w-full h-96">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              {recipe.description}
            </p>

            {/* Recipe Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {recipe.timeInMins && (
                <span className="flex items-center gap-2">
                  ⏱️ {recipe.timeInMins}
                </span>
              )}
              {recipe.difficulty && (
                <span className="flex items-center gap-2">
                  🍳 {recipe.difficulty}
                </span>
              )}
              {recipe.price && (
                <span className="flex items-center gap-2">
                  💰 {recipe.price} kr
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ingredienser
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
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
      </div>
    </div>
  );
}
