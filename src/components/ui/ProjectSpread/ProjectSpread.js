import React, { useRef } from "react";
import useIridescent from "../../../hooks/useIridescent.js";
import "./ProjectSpread.css";

// A live client site set as an editorial spread: the name is the link,
// with its address and details alongside. `flip` mirrors the layout.
export default function ProjectSpread({ site, index, flip = false }) {
    const host = new URL(site.liveUrl).host.replace(/^www\./, "");
    const ref = useRef(null);
    useIridescent(ref);

    return (
        <article
            className={`spread iri ${flip ? "spread--flip" : ""}`}
            aria-labelledby={`site-${site.id}`}
            ref={ref}
        >
            <div className="spread__head">
                <p className="spread__num data">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="spread__title serif" id={`site-${site.id}`}>
                    <a className="spread__link iri-text iri-hover" href={site.liveUrl} target="_blank" rel="noopener noreferrer">
                        {site.name}
                        <span className="spread__arrow arrow arrow--out" aria-hidden="true">↗</span>
                        <span className="visually-hidden"> (live site, opens in a new tab)</span>
                    </a>
                </h3>
                <p className="spread__host data">{host}</p>
            </div>

            <div className="spread__body">
                <p className="label">Client · {site.sector}</p>
                <p className="spread__text">{site.description}</p>
                <ul className="stack data" aria-label="Built with">
                    {site.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
