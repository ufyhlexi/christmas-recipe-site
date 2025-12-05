/**
 * Truncates a title to a maximum length and adds ellipsis if needed
 * @param title - The title to truncate
 * @param maxLength - Maximum length of the title (default: 30)
 * @returns Truncated title with ellipsis if needed
 */
export function truncateTitle(title: string, maxLength: number = 30): string {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength).trim() + "...";
}

