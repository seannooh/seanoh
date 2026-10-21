import { useEffect, useState } from "react";

// Tracks which chapter is being read and how far through it the reader is.
// Section positions are measured once (and again when the page resizes or
// its content changes), so scrolling only does arithmetic on scrollY.
// The active id and "docked" state (hero name scrolled away) live in React
// state; per-frame progress is written straight to the active fill element.
export default function useChapterProgress(chapterIds, heroId, containerRef) {
    const [active, setActive] = useState(null);
    const [docked, setDocked] = useState(false);

    useEffect(() => {
        let frame = 0;
        let sections = [];
        let heroBottom = 0;

        const measure = () => {
            const scrollY = window.scrollY;
            sections = chapterIds
                .map((id) => document.getElementById(id))
                .filter(Boolean)
                .map((el) => {
                    const rect = el.getBoundingClientRect();
                    return { id: el.id, top: rect.top + scrollY, height: rect.height };
                });
            const hero = document.getElementById(heroId);
            heroBottom = hero ? hero.getBoundingClientRect().bottom + scrollY : 0;
        };

        const update = () => {
            frame = 0;
            const scrollY = window.scrollY;
            const viewport = window.innerHeight;
            const readingLine = scrollY + viewport * 0.4;
            const atBottom = scrollY + viewport >= document.documentElement.scrollHeight - 2;

            let current = null;
            let progress = 0;
            sections.forEach((section) => {
                if (section.top <= readingLine) {
                    current = section.id;
                    progress = Math.min(1, (readingLine - section.top) / section.height);
                }
            });
            if (atBottom && sections.length) {
                current = sections[sections.length - 1].id;
                progress = 1;
            }

            setActive(current);
            setDocked(heroBottom - scrollY < viewport * 0.5);
            // Found by href, not .is-active, so it's right even before React re-renders.
            const fill = current
                ? containerRef.current?.querySelector(`.rail__link[href="#${current}"] .rail__fill`)
                : null;
            fill?.style.setProperty("--chapter-progress", progress.toFixed(3));
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const remeasure = () => {
            measure();
            schedule();
        };

        // Content height changes (fonts loading, project rows opening) move the sections.
        const resizeObserver = new ResizeObserver(remeasure);
        resizeObserver.observe(document.body);

        remeasure();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", remeasure);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", remeasure);
        };
    }, [chapterIds, heroId, containerRef]);

    return { active, docked };
}
