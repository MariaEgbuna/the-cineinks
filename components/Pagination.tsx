import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getPageHref(page: number): string {
  return page === 1 ? "/archive" : `/archive/${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number): (number | "...")[] {
  const pages = new Set<number>([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("...");
    }
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-8" aria-label="Pagination">
      {visiblePages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-sm text-ink/40">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={getPageHref(page)}
            className={`w-9 h-9 flex items-center justify-center rounded text-sm ${
              page === currentPage ? "bg-teal text-teal-light" : "bg-ink/5 text-ink/60"
            }`}
          >
            {page}
          </Link>
        )
      )}
    </nav>
  );
}