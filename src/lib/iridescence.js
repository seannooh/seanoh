// Shared driver for the thin-film iridescence. A single pointer/scroll
// listener updates every registered element that's on screen, once per frame:
//   --iri-angle  edge hue rotation: cursor angle + scroll + distance travelled
//   --iri-x/-y   cursor position relative to the element (-0.5 → 0.5)
//   --iri-px/-py cursor position inside the element, in px (edge highlight)
//   --iri-s      element's progress up the viewport (0 → 1)
// Precise pointers only, and off with reduced motion: the CSS defaults in
// styles/iridescence.css are then the static look.

const elements = new Set();
const lastAngle = new WeakMap();
let pointer = null;
let travel = 0;
let frame = 0;
let listening = false;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function update() {
    frame = 0;
    const viewport = window.innerHeight;

    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.bottom < 0 || rect.top > viewport) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const scroll = clamp(1 - centerY / viewport, 0, 1);
        const pointerAngle = pointer
            ? (Math.atan2(pointer.y - centerY, pointer.x - centerX) * 180) / Math.PI + 90
            : 210;

        // Unwrap so crossing ±180° doesn't make the eased angle spin the long way round.
        let angle = pointerAngle + scroll * 140 + travel * 0.08;
        const previous = lastAngle.get(el);
        if (previous !== undefined) angle += Math.round((previous - angle) / 360) * 360;
        lastAngle.set(el, angle);

        const style = el.style;
        style.setProperty("--iri-angle", `${angle.toFixed(1)}deg`);
        style.setProperty("--iri-s", scroll.toFixed(3));
        if (pointer) {
            style.setProperty("--iri-x", clamp((pointer.x - rect.left) / rect.width - 0.5, -0.5, 0.5).toFixed(3));
            style.setProperty("--iri-y", clamp((pointer.y - rect.top) / rect.height - 0.5, -0.5, 0.5).toFixed(3));
            style.setProperty("--iri-px", `${Math.round(pointer.x - rect.left)}px`);
            style.setProperty("--iri-py", `${Math.round(pointer.y - rect.top)}px`);
        }
    });
}

function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
}

function onPointer(event) {
    if (pointer) travel += Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y);
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
}

function start() {
    if (listening) return;
    listening = true;
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
}

function stop() {
    listening = false;
    cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
}

export function registerIridescent(el) {
    const enabled = window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    if (!el || !enabled) return () => {};

    elements.add(el);
    start();
    schedule();
    return () => {
        elements.delete(el);
        if (elements.size === 0) stop();
    };
}
