import React, { useLayoutEffect, useRef, useState } from "react";
import "./Loader.css";

const MIN_MS = 900;
const MAX_MS = 2500;

// Opening screen, shown on every visit. It covers the page while the web
// fonts load (so the type never flashes in a fallback face), for at least
// MIN_MS and at most MAX_MS, then wipes away and the hero's entrance plays.
export default function Loader() {
    const [phase, setPhase] = useState("loading");
    const countRef = useRef(null);
    const barRef = useRef(null);

    useLayoutEffect(() => {
        const html = document.documentElement;
        if (phase === "done") {
            html.classList.remove("is-loading");
            return undefined;
        }
        if (phase !== "loading") return undefined;

        html.classList.add("is-loading");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const minimum = reduceMotion ? 0 : MIN_MS;
        const start = performance.now();
        let fontsReady = !document.fonts;
        let frame = 0;

        document.fonts?.ready.then(() => {
            fontsReady = true;
        });

        const tick = (now) => {
            const elapsed = now - start;
            const timed = minimum ? Math.min(1, elapsed / minimum) : 1;
            // Hold just short of 100 until the fonts have actually loaded.
            let progress = fontsReady ? timed : Math.min(timed, 0.9);
            if (elapsed >= MAX_MS) progress = 1;

            countRef.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");
            barRef.current.style.transform = `scaleX(${progress})`;

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
                return;
            }
            html.classList.remove("is-loading");
            setPhase("leaving");
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [phase]);

    if (phase === "done") return null;

    return (
        <div
            className={`loader ${phase === "leaving" ? "is-leaving" : ""}`}
            aria-hidden="true"
            onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) setPhase("done");
            }}
        >
            <div className="loader__inner">
                <p className="loader__name serif">Sean Oh</p>
                <div className="loader__meter">
                    <span className="loader__count data" ref={countRef}>000</span>
                    <span className="loader__track">
                        <span className="loader__bar" ref={barRef} />
                    </span>
                </div>
            </div>
        </div>
    );
}
