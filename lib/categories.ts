// Categories configuration
export type Category = {
  slug: string;
  label: string;
};

// Main categories for the recipe site
export const categories: Category[] = [
  { slug: "jul", label: "Jul" },
  { slug: "dessert", label: "Dessert" },
  { slug: "bakelser", label: "Bakelser" },
  { slug: "choklad", label: "Choklad" },
  { slug: "kakor", label: "Kakor" },
  { slug: "godis", label: "Godis" },
];

// Helper function to get category label by slug
export function getCategoryLabel(slug: string): string | undefined {
  const category = categories.find((cat) => cat.slug === slug);
  return category?.label;
}

// Helper function to get category slug by label
export function getCategorySlug(label: string): string | undefined {
  const category = categories.find(
    (cat) => cat.label.toLowerCase() === label.toLowerCase()
  );
  return category?.slug;
}

