import React from "react";
import Chapter from "../../ui/Chapter/Chapter.js";
import ProjectSpread from "../../ui/ProjectSpread/ProjectSpread.js";
import ProjectIndex from "../../ui/ProjectIndex/ProjectIndex.js";
import { clientSites, experience, personalProjects } from "../../../data/work.js";
import "./Work.css";

// Work sits on the College Navy band, so the color change marks the chapter.
export default function Work() {
    return (
        <div className="work-band">
            <Chapter id="projects" title="Selected work">
                <div className="chapter__sub">
                    <p className="label">Experience</p>
                    <p className="data">{experience.dates}</p>
                </div>
                <article className="role">
                    <div>
                        <h3 className="role__title">{experience.title}</h3>
                        <p className="role__meta label">
                            <span>{experience.company}</span>
                            <span>{experience.location}</span>
                        </p>
                    </div>
                    <ul className="role__stats">
                        {experience.stats.map((stat) => (
                            <li key={stat.value}>
                                <b>{stat.value}</b>
                                <span>{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="role__points">
                        {experience.highlights.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                </article>

                <div className="chapter__sub">
                    <p className="label">Client websites</p>
                    <p className="data">{clientSites.length} live sites</p>
                </div>
                <div className="work__spreads">
                    {clientSites.map((site, index) => (
                        <ProjectSpread site={site} index={index} flip={index % 2 === 1} key={site.id} />
                    ))}
                </div>

                <div className="chapter__sub">
                    <p className="label">Personal projects</p>
                    <p className="data">{personalProjects.length} projects</p>
                </div>
                <ProjectIndex projects={personalProjects} />
            </Chapter>
        </div>
    );
}
