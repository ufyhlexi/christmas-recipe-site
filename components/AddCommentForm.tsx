"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentFormSchema, CommentFormData } from "@/lib/validation";
import { addComment } from "@/lib/commentsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddCommentFormProps {
  recipeId: string;
}

export default function AddCommentForm({ recipeId }: AddCommentFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  });

  // Mutation for adding comment
  const addCommentMutation = useMutation({
    mutationFn: (data: CommentFormData) => addComment(recipeId, data),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
      // Show success toast
      toast.success("⭐ Tack för din kommentar!");
      // Reset form
      reset();
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
      toast.error("Kunde inte skicka kommentaren. Försök igen.");
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    addCommentMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name field */}
      <div>
        <label
          htmlFor="comment-name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Namn *
        </label>
        <input
          id="comment-name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32f2f] transition-colors ${
            errors.name
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          placeholder="Ditt namn"
          disabled={isSubmitting || addCommentMutation.isPending}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Comment field */}
      <div>
        <label
          htmlFor="comment-text"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Kommentar *
        </label>
        <textarea
          id="comment-text"
          rows={6}
          {...register("comment")}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32f2f] transition-colors resize-none ${
            errors.comment
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          placeholder="Skriv din kommentar här..."
          disabled={isSubmitting || addCommentMutation.isPending}
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting || addCommentMutation.isPending}
        className="w-full bg-[#d32f2f] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b71c1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || addCommentMutation.isPending
          ? "Skickar..."
          : "Skicka kommentar"}
      </button>
    </form>
  );
}

