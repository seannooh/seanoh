import React, { useEffect, useRef } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery.js";
import "./Cursor.css";

const INTERACTIVE = "a, button, [role='button'], label, summary";

// Circle cursor for mouse and trackpad: a dot that tracks exactly and a ring
// that trails slightly. The ring grows over links and buttons, and hands
// over to the lens inside the hero glass. Touch devices keep the default.
export default function Cursor() {
    const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
    const rootRef = useRef(null);
    const ringRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        if (!enabled) return undefined;

        const root = rootRef.current;
        const html = document.documentElement;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: -100, y: -100 };
        const ring = { x: -100, y: -100 };
        let frame = 0;
        let travel = 0;

        html.classList.add("has-cursor");

        const tick = () => {
            frame = 0;
            const ease = reduceMotion ? 1 : 0.22;
            ring.x += (pointer.x - ring.x) * ease;
            ring.y += (pointer.y - ring.y) * ease;
            ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
            dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
            if (Math.abs(pointer.x - ring.x) > 0.1 || Math.abs(pointer.y - ring.y) > 0.1) {
                frame = requestAnimationFrame(tick);
            }
        };

        const onMove = (event) => {
            if (root.classList.contains("is-visible")) {
                travel += Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y);
                root.style.setProperty("--iri-angle", `${(travel * 0.6) % 360}deg`);
            }
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            if (!root.classList.contains("is-visible")) {
                ring.x = pointer.x;
                ring.y = pointer.y;
                root.classList.add("is-visible");
            }
            const target = event.target instanceof Element ? event.target : null;
            root.classList.toggle("is-link", Boolean(target?.closest(INTERACTIVE)));
            root.classList.toggle("is-lens", Boolean(target?.closest(".hero__pane.is-lens")));
            if (!frame) frame = requestAnimationFrame(tick);
        };

        const onLeaveWindow = (event) => {
            if (!event.relatedTarget) root.classList.remove("is-visible");
        };
        const onDown = () => root.classList.add("is-pressed");
        const onUp = () => root.classList.remove("is-pressed");

        document.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("mouseout", onLeaveWindow);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("pointerup", onUp);

        return () => {
            cancelAnimationFrame(frame);
            html.classList.remove("has-cursor");
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("mouseout", onLeaveWindow);
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("pointerup", onUp);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div className="cursor" ref={rootRef} aria-hidden="true">
            <span className="cursor__ring" ref={ringRef} />
            <span className="cursor__dot" ref={dotRef} />
        </div>
    );
}
