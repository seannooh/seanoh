import React, { useEffect, useRef, useState } from "react";
import { chapters, links } from "../../../data/site.js";
import useFullertonWeather from "../../../hooks/useFullertonWeather.js";
import useIridescent from "../../../hooks/useIridescent.js";
import "./Hero.css";

const pacificTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
});

function useFullertonTime() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(id);
    }, []);

    return pacificTime.format(now);
}

// A clear lens follows the cursor through the frosted pane, showing the
// sharp letters underneath. Precise pointers only, and off with reduced motion.
function useLens(paneRef) {
    useEffect(() => {
        const pane = paneRef.current;
        const enabled = window.matchMedia(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
        ).matches;
        if (!enabled) return undefined;

        const onMove = (event) => {
            const rect = pane.getBoundingClientRect();
            pane.style.setProperty("--lx", `${event.clientX - rect.left}px`);
            pane.style.setProperty("--ly", `${event.clientY - rect.top}px`);
        };
        const onEnter = () => pane.classList.add("is-lens");
        const onLeave = () => pane.classList.remove("is-lens");

        pane.addEventListener("pointermove", onMove);
        pane.addEventListener("pointerenter", onEnter);
        pane.addEventListener("pointerleave", onLeave);
        return () => {
            pane.removeEventListener("pointermove", onMove);
            pane.removeEventListener("pointerenter", onEnter);
            pane.removeEventListener("pointerleave", onLeave);
        };
    }, [paneRef]);
}

export default function Hero() {
    const paneRef = useRef(null);
    const nameRef = useRef(null);
    const time = useFullertonTime();
    const temperature = useFullertonWeather();
    useLens(paneRef);
    useIridescent(paneRef);
    useIridescent(nameRef);

    return (
        <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero__inner">
                <div className="hero__eyebrow">
                    <p className="label">Software Engineer &amp; Web Developer</p>
                    <p className="hero__meta data">
                        Fullerton, CA · 33.87°N 117.92°W
                        {temperature !== null && <> · {temperature}°F</>} · <time>{time}</time> PT
                    </p>
                </div>

                <h1 className="hero__name serif iri iri-hover" id="hero-title" ref={nameRef}>
                    <span className="hero__line">
                        <span className="iri-text">Sean</span>
                    </span>
                    <span className="hero__line hero__line--offset">
                        <span className="iri-text">Oh</span>
                    </span>
                </h1>

                <div className="hero__pane iri iri-edge" ref={paneRef}>
                    <div className="hero__frost" aria-hidden="true" />
                    <div className="hero__sheen iri-sheen" aria-hidden="true" />
                    <span className="hero__lens" aria-hidden="true" />
                    <div className="hero__content">
                        <p className="hero__statement">
                            I build responsive production websites and the integrations behind them, from
                            React interfaces to the APIs and data workflows that keep them running.
                        </p>
                        <p className="hero__now label">
                            Now — Web &amp; Marketing Systems Specialist, Franchise Focused Marketing
                        </p>
                        <div className="hero__actions">
                            <a href="#projects" className="btn btn--primary">
                                View work <span className="arrow arrow--down" aria-hidden="true">↓</span>
                            </a>
                            <a href={links.resume} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                                Résumé <span className="arrow arrow--out" aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                <nav className="hero__index" aria-label="Chapters">
                    <ol>
                        {chapters.map((chapter, index) => (
                            <li key={chapter.id}>
                                <a href={`#${chapter.id}`}>
                                    <span className="hero__num">{String(index + 1).padStart(2, "0")}</span>
                                    {chapter.label}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </section>
    );
}
