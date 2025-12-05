import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingDisplayProps {
  rating: number | null | undefined;
  ratingCount: number;
  size?: "small" | "medium" | "large";
}

// Функция для форматирования числа (добавляет пробелы для разделения тысяч)
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function RatingDisplay({
  rating,
  ratingCount,
  size = "medium",
}: RatingDisplayProps) {
  // Если рейтинга нет, показываем 0 звезд
  const displayRating = rating ?? 0;
  const displayCount = ratingCount || 0;

  // Размеры для разных вариантов
  const sizeClasses = {
    small: "text-sm font-semibold",
    medium: "text-base font-semibold",
    large: "text-lg font-semibold",
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 20,
  };

  // Вычисляем количество полных, половинных и пустых звезд
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {/* Полные звезды */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar
            key={`full-${index}`}
            className="text-[#d32f2f]"
            size={iconSizes[size]}
          />
        ))}
        {/* Половинная звезда */}
        {hasHalfStar && (
          <FaStarHalfAlt
            className="text-[#d32f2f]"
            size={iconSizes[size]}
          />
        )}
        {/* Пустые звезды */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            className="text-gray-300"
            size={iconSizes[size]}
          />
        ))}
      </div>
      {/* Показываем число только если есть оценки (ratingCount > 0) */}
      {displayCount > 0 && (
        <span className={`text-gray-700 ${sizeClasses[size]}`}>
          {formatNumber(displayCount)}
        </span>
      )}
    </div>
  );
}

