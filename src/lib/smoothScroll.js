import Lenis from "lenis";

// One shared Lenis instance. Smoothing is only used with a mouse or
// trackpad and without reduced motion; touch keeps native scrolling.
let lenis = null;

export function startSmoothScroll() {
    if (lenis) return lenis;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return null;

    // A light touch: higher lerp means less smoothing (Lenis default is 0.1).
    lenis = new Lenis({ lerp: 0.14, autoRaf: true });
    return lenis;
}

export function stopSmoothScroll() {
    lenis?.destroy();
    lenis = null;
}

export function getSmoothScroll() {
    return lenis;
}
