"use client";

import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { addRecipeRating } from "@/lib/api";
import toast from "react-hot-toast";
import type { ApiRecipe } from "@/lib/api";

interface RatingInputProps {
  recipeId: string;
  currentRating: number | null | undefined;
  ratingCount: number;
  onRatingUpdate?: (updatedRecipe: ApiRecipe) => void;
}

export default function RatingInput({
  recipeId,
  currentRating,
  ratingCount,
  onRatingUpdate,
}: RatingInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [localRating, setLocalRating] = useState<number | null>(
    currentRating ?? null
  );

  // Синхронизируем localRating с currentRating при обновлении
  useEffect(() => {
    setLocalRating(currentRating ?? null);
  }, [currentRating]);

  const handleStarClick = async (rating: number) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLocalRating(rating);

    // Logging for debugging
    // console.log("⭐ Rating Input Debug:", {
    //   recipeId,
    //   rating,
    //   currentRating,
    //   ratingCount,
    // });

    try {
      const updatedRecipe = await addRecipeRating(recipeId, rating);
      
      toast.success("Tack för din betyg!", {
        icon: "⭐",
        duration: 3000,
      });

      // Обновляем родительский компонент с новыми данными
      if (onRatingUpdate) {
        onRatingUpdate(updatedRecipe);
      }
    } catch (error) {
      console.error("Error adding rating:", error);
      toast.error("Kunde inte spara betyget. Försök igen.", {
        duration: 3000,
      });
      // Возвращаем предыдущий рейтинг при ошибке
      setLocalRating(currentRating ?? null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating ?? localRating ?? 0;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">
        Vad tyckte du om receptet?
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => !isSubmitting && setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              disabled={isSubmitting}
              className="focus:outline-none transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Rate ${star} stars`}
            >
              {star <= displayRating ? (
                <FaStar
                  className="text-[#d32f2f] cursor-pointer"
                  size={28}
                />
              ) : (
                <FaRegStar
                  className="text-gray-300 cursor-pointer"
                  size={28}
                />
              )}
            </button>
          ))}
        </div>
        {isSubmitting && (
          <span className="text-gray-500 text-sm">Sparar...</span>
        )}
      </div>
      {ratingCount > 0 && (
        <p className="text-sm text-gray-600">
          {ratingCount} {ratingCount === 1 ? "betyg" : "betyg"}
        </p>
      )}
    </div>
  );
}

