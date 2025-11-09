import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../lib/types";
import { CiClock2 } from "react-icons/ci";
import {
  PiCookingPotDuotone,
  PiCookingPot,
} from "react-icons/pi";

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <article className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="py-2 px-1 flex flex-col justify-between">
          <h3 className="text-[16px] text-center">{recipe.title}</h3>
          <div className="bg-[#f5faf4]  text-sm text-gray-600 flex flex-col justify-center sm:flex-row gap-1.5 sm:h-8 sm:gap-2 py-1">
            <div className="flex items-center justify-center gap-2">
              <CiClock2 />
              <span>{recipe.timeInMins}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              {recipe.difficulty === "Medel" ? (
                <PiCookingPotDuotone />
              ) : (
                <PiCookingPot />
              )}
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
