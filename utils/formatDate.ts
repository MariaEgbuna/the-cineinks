// Short date, like "Nov 26, 2026". timeZone: "UTC" gives the same calendar
// day on the server and in every visitor's browser.
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}