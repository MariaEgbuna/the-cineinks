"use client";

import { useEffect, useRef } from "react";

type ReadingProgressProps = {
  targetId?: string;
};

export default function ReadingProgress({ targetId = "post-body" }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const bar = barRef.current;
      const target = document.getElementById(targetId);
      if (!bar || !target) return;

      // 0 when the article's top reaches the top of the screen,
      // 1 when its bottom reaches the bottom of the screen
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-teal to-teal-light"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}