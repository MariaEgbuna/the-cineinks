import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const WINDOW_SIZE = 3;

function getPageHref(page: number): string {
  return page === 1 ? "/archive" : `/archive/${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  const half = Math.floor(WINDOW_SIZE / 2);
  let start = currentPage - half;
  start = Math.min(start, totalPages - WINDOW_SIZE + 1);
  start = Math.max(start, 1);
  const end = Math.min(start + WINDOW_SIZE - 1, totalPages);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }
  return pages;
}

const baseButton = "w-9 h-9 flex items-center justify-center rounded text-sm";

type ArrowProps = {
  symbol: string;
  label: string;
  page: number;
  disabled: boolean;
};

function Arrow({ symbol, label, page, disabled }: ArrowProps) {
  if (disabled) {
    return (
      <span aria-hidden="true" className={`${baseButton} bg-main/5 text-main/20`}>
        {symbol}
      </span>
    );
  }

  return (
    <Link
      href={getPageHref(page)}
      aria-label={label}
      className={`${baseButton} bg-main/5 text-main/60`}
    >
      {symbol}
    </Link>
  );
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-8" aria-label="Pagination">
      {/* « jumps to the first page, ‹ goes back one page */}
      <Arrow symbol="«" label="First page" page={1} disabled={isFirst} />
      <Arrow symbol="‹" label="Previous page" page={currentPage - 1} disabled={isFirst} />

      {visiblePages.map((page) => (
        <Link
          key={page}
          href={getPageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`${baseButton} ${
            page === currentPage ? "bg-teal text-teal-light" : "bg-main/5 text-main/60"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* › goes forward one page, » jumps to the last page */}
      <Arrow symbol="›" label="Next page" page={currentPage + 1} disabled={isLast} />
      <Arrow symbol="»" label="Last page" page={totalPages} disabled={isLast} />
    </nav>
  );
}