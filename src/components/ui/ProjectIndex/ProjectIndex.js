import React, { Fragment, useRef, useState } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery.js";
import useIridescent from "../../../hooks/useIridescent.js";
import "./ProjectIndex.css";

// Personal projects as an index. On wide screens the rows sit beside a
// spec panel showing the selected project (hover or click to switch).
// On narrow screens each row opens its panel inline.
export default function ProjectIndex({ projects }) {
    const wide = useMediaQuery("(min-width: 900px)");
    const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
    const [active, setActive] = useState(projects[0].id);
    const ref = useRef(null);
    useIridescent(ref);
    const shown = active ?? (wide ? projects[0].id : null);

    const select = (id) => {
        if (wide) setActive(id);
        else setActive((current) => (current === id ? null : id));
    };

    return (
        <div className="index iri" ref={ref}>
            {projects.map((project, index) => {
                const open = shown === project.id;
                const panelId = `project-${project.id}`;

                return (
                    <Fragment key={project.id}>
                        <button
                            type="button"
                            className={`index__row iri-hover ${open ? "is-open" : ""}`}
                            style={wide ? { gridRow: index + 1 } : undefined}
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => select(project.id)}
                            onMouseEnter={() => wide && finePointer && setActive(project.id)}
                        >
                            <span className="index__num data">{String(index + 1).padStart(2, "0")}</span>
                            <span className="index__title serif iri-text">{project.name}</span>
                            <span className="index__stack data">{project.stack.join(" / ")}</span>
                            <span className="index__icon" aria-hidden="true" />
                        </button>

                        <div
                            className={`index__panel ${open ? "is-open" : ""}`}
                            id={panelId}
                            style={wide ? { gridRow: `1 / span ${projects.length}` } : undefined}
                            inert={!open}
                        >
                            <div>
                                <div className="index__inner">
                                    <p className="index__summary">{project.summary}</p>
                                    <ul className="index__notes">
                                        {project.highlights.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                    <div className="index__links">
                                        {project.liveUrl && (
                                            <a className="link-line" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                Live site <span className="arrow arrow--out" aria-hidden="true">↗</span>
                                            </a>
                                        )}
                                        <a className="link-line" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                            Code <span className="arrow arrow--out" aria-hidden="true">↗</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}
