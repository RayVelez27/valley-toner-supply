import { useEffect } from "react";

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;
const SETTLE_MS = 900;

// Fades [data-reveal] elements up into place the first time they scroll into view.
// Content is only hidden once this runs, so it stays visible without JavaScript,
// and nothing moves for visitors who prefer reduced motion.
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const timers: number[] = [];

    // Siblings that reveal together get a short cascade.
    for (const el of targets) {
      const siblings = Array.from(el.parentElement?.children ?? []).filter((s) => s.hasAttribute("data-reveal"));
      const step = Math.min(siblings.indexOf(el), MAX_STAGGER_STEPS);
      if (step > 0) el.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
    }

    // Anything already on screen stays put, so there's no flash on load.
    const inView = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight * 0.92;
    const pending = targets.filter((el) => {
      if (inView(el)) {
        el.removeAttribute("data-reveal");
        return false;
      }
      return true;
    });
    root.classList.add("vts-motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.classList.add("is-revealed");
          // Hand transforms back to hover styles once the entrance has finished.
          const delay = parseInt(el.style.getPropertyValue("--reveal-delay") || "0", 10);
          timers.push(window.setTimeout(() => {
            el.removeAttribute("data-reveal");
            el.classList.remove("is-revealed");
            el.style.removeProperty("--reveal-delay");
          }, SETTLE_MS + delay));
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      root.classList.remove("vts-motion");
    };
  }, []);
}
