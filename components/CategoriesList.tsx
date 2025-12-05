import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { categories } from "@/lib/categories";

export default function CategoriesList() {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Rekommenderade kategorier
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <span className="text-gray-800 font-medium text-sm md:text-base">
                {category.label}
              </span>
              <IoChevronForward className="text-gray-400 group-hover:text-[#d32f2f] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

