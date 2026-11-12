import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  // Where the links point. Defaults to the archive.
  basePath?: string;
  // When set, links use ?page=2 style (for search) and keep these params.
  // When left out, links use /archive/2 style.
  queryParams?: Record<string, string>;
};

const WINDOW_SIZE = 3;

function getPageHref(
  page: number,
  basePath: string,
  queryParams?: Record<string, string>
): string {
  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  }
  return page === 1 ? basePath : `${basePath}/${page}`;
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
  href: string;
  disabled: boolean;
};

function Arrow({ symbol, label, href, disabled }: ArrowProps) {
  if (disabled) {
    return (
      <span aria-hidden="true" className={`${baseButton} bg-main/5 text-main/20`}>
        {symbol}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={`${baseButton} bg-main/5 text-main/60`}
    >
      {symbol}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/archive",
  queryParams,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const hrefFor = (page: number) => getPageHref(page, basePath, queryParams);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-8" aria-label="Pagination">
      {/* « jumps to the first page, ‹ goes back one page */}
      <Arrow symbol="«" label="First page" href={hrefFor(1)} disabled={isFirst} />
      <Arrow symbol="‹" label="Previous page" href={hrefFor(currentPage - 1)} disabled={isFirst} />

      {visiblePages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`${baseButton} ${
            page === currentPage ? "bg-teal text-teal-light" : "bg-main/5 text-main/60"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* › goes forward one page, » jumps to the last page */}
      <Arrow symbol="›" label="Next page" href={hrefFor(currentPage + 1)} disabled={isLast} />
      <Arrow symbol="»" label="Last page" href={hrefFor(totalPages)} disabled={isLast} />
    </nav>
  );
}