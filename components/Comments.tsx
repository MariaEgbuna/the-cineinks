"use client";

import { useEffect, useRef } from "react";

export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "MariaEgbuna/the-cineinks");
    script.setAttribute("data-repo-id", "R_kgDOUXx_Pw");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDOUXx_P84DFkIx");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="mt-10" />;
}