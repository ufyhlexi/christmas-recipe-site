"use client";

import { useQuery } from "@tanstack/react-query";
import { getComments, ApiComment } from "@/lib/commentsApi";
import AddCommentForm from "./AddCommentForm";
import { format } from "date-fns";
import { sv } from "date-fns/locale/sv";
import LoadingSpinner from "./LoadingSpinner";

interface CommentsSectionProps {
  recipeId: string;
}

// Helper function to format date
function formatCommentDate(dateString?: string): string {
  if (!dateString) return "Okänt datum";
  try {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy 'kl' HH:mm", { locale: sv });
  } catch (error) {
    return "Ogiltigt datum";
  }
}

// Transform API comment to display format
function transformComment(apiComment: ApiComment) {
  return {
    id: apiComment._id,
    name: apiComment.name,
    comment: apiComment.comment,
    createdAt: apiComment.createdAt,
    recipeId: apiComment.recipeId,
  };
}

export default function CommentsSection({ recipeId }: CommentsSectionProps) {
  // Fetch comments using React Query
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", recipeId],
    queryFn: () => getComments(recipeId),
    staleTime: 30000, // Consider data fresh for 30 seconds
  });

  const transformedComments = comments.map(transformComment);

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Kommentarer</h2>

      {/* Add Comment Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Skriv en kommentar
        </h3>
        <AddCommentForm recipeId={recipeId} />
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">
              Kunde inte ladda kommentarer. Försök igen senare.
            </p>
          </div>
        ) : transformedComments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600">
              Inga kommentarer ännu. Var först med att kommentera!
            </p>
          </div>
        ) : (
          <>
            {/* Comments count */}
            <div className="mb-4">
              <p className="text-gray-600 font-medium">
                {transformedComments.length}{" "}
                {transformedComments.length === 1
                  ? "kommentar"
                  : "kommentarer"}
              </p>
            </div>

            {/* Comments cards */}
            {transformedComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {comment.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCommentDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {comment.comment}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

