import React, { useEffect, useRef } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery.js";
import "./Grid.css";

// The page's real layout grid, drawn behind the content: the content
// column's edges, its 12 column lines, a 96px row rhythm, and a "+" at every
// 4th column × 4th row. On desktop with a mouse, rows drift with scroll, the
// grid eases down once the hero has passed, and inside the hero the lines
// brighten around the cursor while the nearest intersection snaps on with
// its CSS grid-line coordinates. Everything else gets the static grid.
const INTERACTIVE =
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 900px)";
const MARK_COLUMNS = [0, 4, 8, 12];
const MARK_ROWS = 7;

const pad = (value) => String(value).padStart(2, "0");

function Marks() {
    return (
        <div className="grid__marks">
            {Array.from({ length: MARK_ROWS }, (_, row) =>
                MARK_COLUMNS.map((k) => (
                    <span
                        key={`${row}-${k}`}
                        className={`grid__mark ${k === 12 ? "grid__mark--end" : k > 0 ? "grid__mark--mid" : ""}`}
                        style={{ "--k": k, "--r": row }}
                    />
                ))
            )}
        </div>
    );
}

export default function Grid() {
    const interactive = useMediaQuery(INTERACTIVE);
    const rootRef = useRef(null);
    const frameRef = useRef(null);
    const colsRef = useRef(null);
    const hotRef = useRef(null);
    const pointRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        if (!interactive) return undefined;

        const root = rootRef.current;
        const drifts = root.querySelectorAll(".grid__drift");
        const css = getComputedStyle(root);
        const row = parseFloat(css.getPropertyValue("--grid-row")) || 96;
        const depth = parseFloat(css.getPropertyValue("--grid-depth")) || 0.15;
        const reading = parseFloat(css.getPropertyValue("--grid-strength-reading")) || 0.5;
        const gap = parseFloat(css.getPropertyValue("--space-5")) || 24;
        const tile = row * 4;

        let pointer = null;
        let frame = 0;
        let cols = null;
        let frameLeft = 0;
        let heroHeight = 0;
        let lastLabel = "";

        const measure = () => {
            cols = colsRef.current.getBoundingClientRect();
            frameLeft = frameRef.current.getBoundingClientRect().left;
            heroHeight = document.getElementById("top")?.offsetHeight || window.innerHeight;
        };

        const update = () => {
            frame = 0;
            const scrollY = window.scrollY;
            const travel = scrollY * (1 - depth);
            const offset = travel % tile;

            drifts.forEach((drift) => {
                drift.style.transform = `translate3d(0, ${-offset}px, 0)`;
            });

            const fade = Math.min(1, scrollY / (heroHeight * 0.8));
            root.style.setProperty("--grid-strength", (1 - fade * (1 - reading)).toFixed(3));

            const hot = pointer !== null && pointer.y < heroHeight - scrollY;
            root.classList.toggle("is-hot", hot);
            if (!hot) return;

            const hotStyle = hotRef.current.style;
            hotStyle.setProperty("--gx", `${pointer.x - frameLeft}px`);
            hotStyle.setProperty("--gy", `${pointer.y}px`);

            // Snap to the nearest grid-line intersection.
            const period = (cols.width + gap) / 12;
            const k = Math.min(12, Math.max(0, Math.round((pointer.x - cols.left) / period)));
            const x = k < 12 ? cols.left + k * period : cols.right - 1;
            const m = Math.round((pointer.y + offset) / row);
            const y = m * row - offset;
            const rowNumber = Math.round((travel - offset) / row) + m + 1;

            pointRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            const label = `C${pad(k + 1)} · R${pad(rowNumber)}`;
            if (label !== lastLabel) {
                labelRef.current.textContent = label;
                lastLabel = label;
            }
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const onPointer = (event) => {
            pointer = { x: event.clientX, y: event.clientY };
            schedule();
        };
        const onLeave = (event) => {
            if (event.relatedTarget) return;
            pointer = null;
            schedule();
        };
        const onResize = () => {
            measure();
            schedule();
        };

        measure();
        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", onResize);
        document.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("mouseout", onLeave);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("pointermove", onPointer);
            document.removeEventListener("mouseout", onLeave);
            drifts.forEach((drift) => {
                drift.style.transform = "";
            });
            root.style.removeProperty("--grid-strength");
            root.classList.remove("is-hot");
        };
    }, [interactive]);

    return (
        <div className="grid" ref={rootRef} aria-hidden="true">
            <div className="grid__frame" ref={frameRef}>
                <div className="grid__cols" ref={colsRef} />
                <div className="grid__drift">
                    <Marks />
                </div>

                <div className="grid__hot" ref={hotRef}>
                    <div className="grid__cols" />
                    <div className="grid__drift">
                        <Marks />
                    </div>
                </div>
            </div>

            <div className="grid__point" ref={pointRef}>
                <span className="grid__label" ref={labelRef} />
            </div>
        </div>
    );
}
