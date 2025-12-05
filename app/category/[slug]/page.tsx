import { notFound } from "next/navigation";
import { fetchRecipes } from "@/lib/api";
import { mergeRecipesData } from "@/lib/recipeUtils";
import { RecipeCard } from "@/components/RecipeCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { getCategoryLabel } from "@/lib/categories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Get category label from slug
  const categoryLabel = getCategoryLabel(slug);
  
  // If category not found, show 404
  if (!categoryLabel) {
    notFound();
  }

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

  // Filter recipes by category (match by label)
  const categoryRecipes = allRecipes.filter((recipe) =>
    recipe.categories?.some(
      (category) => category.toLowerCase() === categoryLabel.toLowerCase()
    )
  );

  // If no recipes found for this category, show 404
  if (categoryRecipes.length === 0) {
    notFound();
  }

  return (
    <>
      <Header />
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

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {categoryLabel}
            </h1>
            <p className="text-gray-600">
              {categoryRecipes.length} {categoryRecipes.length === 1 ? "recept" : "recept"} i denna kategori
            </p>
          </div>

          {/* Recipes Grid */}
          <div className="grid max-[450px]:grid-cols-1 grid-cols-2 min-[769px]:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {categoryRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
