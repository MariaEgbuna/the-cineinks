export type Category = {
  label: string;
  slug: string;
  isMainType?: boolean;
};

export const categories: Category[] = [
  { label: "Movies", slug: "movies", isMainType: true },
  { label: "Series", slug: "series", isMainType: true },
  { label: "Anime", slug: "anime", isMainType: true },
  { label: "KDrama", slug: "kdrama", isMainType: true },
  { label: "Recap", slug: "recap" },
  { label: "List", slug: "list" },
  { label: "Spotlight", slug: "spotlight" },
  { label: "Extra", slug: "extra" },
];