import { useEffect } from "react";
import { startSmoothScroll, stopSmoothScroll } from "../lib/smoothScroll.js";

// Starts Lenis and routes in-page links (#about, #top, the skip link)
// through it, then moves keyboard focus to the target like a native jump.
export default function useSmoothScroll() {
    useEffect(() => {
        const lenis = startSmoothScroll();
        if (!lenis) return undefined;

        const onClick = (event) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
            const id = link?.getAttribute("href").slice(1);
            const target = id ? document.getElementById(id) : null;
            if (!target) return;

            event.preventDefault();
            const offset = -parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || 0);
            // force: also runs while Lenis is paused (e.g. from the open mobile menu).
            lenis.scrollTo(target, {
                offset,
                force: true,
                onComplete: () => {
                    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
                    target.focus({ preventScroll: true });
                },
            });
            window.history.pushState(null, "", `#${id}`);
        };

        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);
            stopSmoothScroll();
        };
    }, []);
}
