// API service for working with comments

const API_BASE_URL = "https://grupp1-xjvta.reky.se";

// Type for comment from API
export interface ApiComment {
  _id: string;
  name: string;
  comment: string;
  createdAt?: string;
  recipeId?: string;
}

// Type for comment input (POST request)
export interface CommentInput {
  name: string;
  comment: string;
}

// Fetch all comments for a recipe
export async function getComments(recipeId: string): Promise<ApiComment[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/recipes/${recipeId}/comments`,
      {
        next: { revalidate: 0 }, // No cache - always fetch fresh data
        cache: "no-store", // Disable caching
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return []; // No comments found - return empty array
      }
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return []; // Return empty array on error
  }
}

// Add a comment to a recipe
export async function addComment(
  recipeId: string,
  commentData: CommentInput
): Promise<ApiComment> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/recipes/${recipeId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);
      throw new Error(`Failed to add comment: ${response.statusText}`);
    }

    // Check if response has body
    const responseText = await response.text();

    // If response is empty, try to fetch the comment list
    if (!responseText || responseText.trim() === "") {
      // Return a temporary comment object (will be refetched by React Query)
      return {
        _id: `temp-${Date.now()}`,
        name: commentData.name,
        comment: commentData.comment,
        recipeId,
        createdAt: new Date().toISOString(),
      };
    }

    // Try to parse JSON
    let data: ApiComment;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON response:", parseError);
      // Return temporary comment object
      return {
        _id: `temp-${Date.now()}`,
        name: commentData.name,
        comment: commentData.comment,
        recipeId,
        createdAt: new Date().toISOString(),
      };
    }

    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

