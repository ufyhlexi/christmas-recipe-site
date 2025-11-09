import { notFound } from "next/navigation";
import { fetchRecipes } from "@/lib/api";
import { mergeRecipesData } from "@/lib/recipeUtils";
import { RecipeCard } from "@/components/RecipeCard";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);

  // Fetch all recipes from API
  let apiRecipes;
  try {
    apiRecipes = await fetchRecipes();
  } catch (error) {
    console.error("Error loading recipes:", error);
    notFound();
  }

  // Merge with metadata
  const allRecipes = mergeRecipesData(apiRecipes);

  // Filter recipes by category
  const categoryRecipes = allRecipes.filter((recipe) =>
    recipe.categories?.some(
      (category) => category.toLowerCase() === categoryName.toLowerCase()
    )
  );

  // If no recipes found for this category, show 404
  if (categoryRecipes.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-[#d32f2f] hover:underline mb-4 inline-block"
          >
            ← Tillbaka till startsidan
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Kategori: {categoryName}
          </h1>
          <p className="text-gray-600">
            {categoryRecipes.length} {categoryRecipes.length === 1 ? "recept" : "recept"} i denna kategori
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
