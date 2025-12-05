// Validation schemas for comments using Zod

import { z } from "zod";

// Blacklist of forbidden words (basic Swedish/English profanity)
const FORBIDDEN_WORDS = [
  "dum",
  "idiot",
  "fitta",
  "kuk",
  "shit",
  "fuck",
  "damn",
  "hell",
];

// Helper function to check for forbidden words
function containsForbiddenWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_WORDS.some((word) => lowerText.includes(word));
}

// Helper function to check for HTML tags
function containsHTML(text: string): boolean {
  return /<[^>]*>/g.test(text);
}

// Helper function to check for SQL injection patterns
function containsSQLInjection(text: string): boolean {
  const sqlPatterns = [
    /select\s+/i,
    /drop\s+/i,
    /insert\s+/i,
    /delete\s+/i,
    /update\s+/i,
    /union\s+/i,
    /exec\s+/i,
    /script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
  ];
  return sqlPatterns.some((pattern) => pattern.test(text));
}

// Helper function to check for script tags and JavaScript
function containsScripts(text: string): boolean {
  const scriptPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /onclick=/i,
    /onmouseover=/i,
  ];
  return scriptPatterns.some((pattern) => pattern.test(text));
}

// Custom refinement for name validation
const nameSchema = z
  .string()
  .min(2, "Namnet måste vara minst 2 tecken")
  .max(50, "Namnet får inte vara längre än 50 tecken")
  .refine((val) => !containsHTML(val), {
    message: "Namnet får inte innehålla HTML-taggar",
  })
  .refine((val) => !containsSQLInjection(val), {
    message: "Ogiltigt innehåll i namnet",
  })
  .refine((val) => !containsForbiddenWords(val), {
    message: "Namnet innehåller otillåtna ord",
  })
  .refine((val) => !containsScripts(val), {
    message: "Namnet får inte innehålla skript",
  });

// Custom refinement for comment validation
const commentSchema = z
  .string()
  .min(10, "Kommentaren måste vara minst 10 tecken")
  .max(500, "Kommentaren får inte vara längre än 500 tecken")
  .refine((val) => !containsHTML(val), {
    message: "Kommentaren får inte innehålla HTML-taggar",
  })
  .refine((val) => !containsSQLInjection(val), {
    message: "Ogiltigt innehåll i kommentaren",
  })
  .refine((val) => !containsForbiddenWords(val), {
    message: "Kommentaren innehåller otillåtna ord",
  })
  .refine((val) => !containsScripts(val), {
    message: "Kommentaren får inte innehålla skript",
  });

// Main schema for comment form
export const commentFormSchema = z.object({
  name: nameSchema,
  comment: commentSchema,
});

export type CommentFormData = z.infer<typeof commentFormSchema>;

