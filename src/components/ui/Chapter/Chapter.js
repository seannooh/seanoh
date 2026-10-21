import React, { useRef } from "react";
import useIridescent from "../../../hooks/useIridescent.js";
import { chapters } from "../../../data/site.js";
import useReveal from "../../../hooks/useReveal.js";
import "./Chapter.css";

// Shared section frame: hairline, "02 / Work" label, and serif title,
// with the same opening sequence for every chapter.
export default function Chapter({ id, title, titleClassName = "", className = "", children }) {
    const ref = useReveal();
    const headRef = useRef(null);
    useIridescent(headRef);
    const index = chapters.findIndex((chapter) => chapter.id === id);
    const { label } = chapters[index];

    return (
        <section id={id} className={`chapter ${className}`} aria-labelledby={`${id}-title`} ref={ref}>
            <div className="chapter__head iri iri-hover" ref={headRef}>
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
