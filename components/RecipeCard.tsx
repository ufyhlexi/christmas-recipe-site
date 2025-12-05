import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../lib/types";
import { truncateTitle } from "../lib/textUtils";
import { CiClock2 } from "react-icons/ci";
import {
  PiCookingPotDuotone,
  PiCookingPot,
} from "react-icons/pi";
import RatingDisplay from "./RatingDisplay";

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  // Truncate title to fit on one line (max 28 characters for card width)
  const truncatedTitle = truncateTitle(recipe.title, 28);

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <article className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col max-[450px]:flex-row-reverse max-[450px]:items-stretch">
        {/* Image - Right on small screens, Top on larger screens */}
        <div className="relative w-full h-56 overflow-hidden flex-shrink-0 max-[450px]:w-32 max-[450px]:flex-shrink-0 max-[450px]:h-full">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 450px) 128px, 224px"
          />
        </div>
        {/* Content - Left on small screens, Bottom on larger screens */}
        <div className="py-2 px-2 flex flex-col justify-between flex-grow max-[450px]:px-3 max-[450px]:py-3 max-[450px]:min-w-0 max-[450px]:flex-1">
          {/* Title - Always at top */}
          <div className="flex-shrink-0">
            <h3 
              className="text-[16px] text-center px-1 py-1 flex items-center justify-center max-[450px]:text-left max-[450px]:justify-start max-[450px]:min-h-auto max-[450px]:py-0 max-[450px]:text-sm max-[450px]:font-semibold max-[450px]:leading-tight"
              title={recipe.title}
            >
              <span className="truncate w-full overflow-hidden whitespace-nowrap text-ellipsis block max-[450px]:whitespace-normal max-[450px]:line-clamp-2">
                {recipe.title}
              </span>
            </h3>
          </div>

          {/* Rating - grows to fill space on small screens */}
          <div className="flex-grow min-h-[35px] flex items-center justify-center max-[450px]:justify-start py-2">
            <RatingDisplay
              rating={recipe.avgRating}
              ratingCount={recipe.ratings?.length || 0}
              size="small"
            />
          </div>

          {/* Meta info (time and difficulty) - Always at bottom */}
          <div className="bg-[#f5faf4] text-sm text-gray-600 flex flex-col justify-center sm:flex-row gap-1.5 sm:h-8 sm:gap-2 py-1 flex-shrink-0 max-[450px]:gap-3 max-[450px]:py-1.5 max-[450px]:text-xs max-[450px]:rounded">
            <div className="flex items-center justify-center gap-2 max-[450px]:justify-start">
              <CiClock2 className="max-[450px]:text-base" />
              <span>{recipe.timeInMins}</span>
            </div>
            <div className="flex items-center justify-center gap-2 max-[450px]:justify-start">
              {recipe.difficulty === "Medel" ? (
                <PiCookingPotDuotone className="max-[450px]:text-base" />
              ) : (
                <PiCookingPot className="max-[450px]:text-base" />
              )}
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
