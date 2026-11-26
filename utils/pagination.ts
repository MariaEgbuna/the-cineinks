// How many posts show on one page
export const POSTS_PER_PAGE = 9;

// Always at least 1, so an empty list still has a first page
export function getTotalPages(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE));
}

// For generateStaticParams: pages 2 and up (page 1 has its own route)
export function getExtraPageParams(totalPages: number) {
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

// Returns the number for "2", "3" and so on, or null for anything else
export function parsePageParam(page: string): number | null {
  if (!/^[1-9]\d*$/.test(page)) return null;
  const pageNumber = Number(page);
  return pageNumber >= 2 ? pageNumber : null;
}