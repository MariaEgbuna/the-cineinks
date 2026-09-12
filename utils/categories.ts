export type Category = {
  label: string;
  slug: string;
};

export const categories: Category[] = [
  { label: "Movies", slug: "movies" },
  { label: "Series", slug: "series" },
  { label: "Anime", slug: "anime" },
  { label: "KDrama", slug: "kdrama" },
  { label: "Recap", slug: "recap" },
  { label: "List", slug: "list" },
  { label: "Spotlight", slug: "spotlight" },
  { label: "Extra", slug: "extra" },
];