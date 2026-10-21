import { useEffect, useRef } from "react";

// Plays a one-time entrance for elements that start below the fold.
// Anything already on screen at load (or with reduced motion) stays as-is,
// so content is never hidden waiting for an observer.
export default function useReveal() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!el || reduceMotion || !("IntersectionObserver" in window)) return undefined;
        if (el.getBoundingClientRect().top < window.innerHeight) return undefined;

        el.classList.add("is-pre");
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                el.classList.remove("is-pre");
                observer.disconnect();
            },
            { rootMargin: "0px 0px -15% 0px" }
        );
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return ref;
}
