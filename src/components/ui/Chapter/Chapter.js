import React, { useEffect, useRef, useState } from "react";
import useIridescent from "../../../hooks/useIridescent.js";
import { chapters } from "../../../data/site.js";
import useReveal from "../../../hooks/useReveal.js";
import "./Chapter.css";

// True while the element sits in the middle band of the viewport, so the
// headline lights up as its section arrives and dims as it leaves.
function useInView(ref) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
            rootMargin: "-15% 0px -35% 0px",
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    return inView;
}

// Shared section frame: hairline, "02 / Work" label, and serif title,
// with the same opening sequence for every chapter.
export default function Chapter({ id, title, titleClassName = "", className = "", children }) {
    const ref = useReveal();
    const headRef = useRef(null);
    useIridescent(headRef);
    const lit = useInView(headRef);
    const index = chapters.findIndex((chapter) => chapter.id === id);
    const { label } = chapters[index];

    return (
        <section id={id} className={`chapter ${className}`} aria-labelledby={`${id}-title`} ref={ref}>
            <div className={`chapter__head iri iri-hover ${lit ? "is-lit" : ""}`} ref={headRef}>
                <div className="chapter__rule" aria-hidden="true" />
                <p className="chapter__label label">
                    <span className="data">{String(index + 1).padStart(2, "0")}</span> {label}
                </p>
                <h2 id={`${id}-title`} className={`chapter__title iri-text ${titleClassName}`}>
                    {title}
                </h2>
            </div>
            <div className="chapter__body">{children}</div>
        </section>
    );
}
