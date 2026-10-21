import React, { useRef } from "react";
import useIridescent from "../../../hooks/useIridescent.js";
import Chapter from "../../ui/Chapter/Chapter.js";
import "./About.css";

const facts = [
    { term: "Education", detail: "B.S. Computer Science, cum laude · Minor in Mathematics" },
    { term: "University", detail: "University of Redlands · Sep 2021 – Apr 2025 · GPA 3.7" },
    { term: "Award", detail: "Lawrence Harvill Award (2025), Most Outstanding Senior CS Major" },
    { term: "Athletics", detail: "NCAA Division III Football, 4 seasons · Scholar-Athlete" },
];

export default function About() {
    const photoRef = useRef(null);
    useIridescent(photoRef);

    return (
        <Chapter id="about" title="Who I am">
            <div className="about">
                <figure className="about__photo iri iri-edge" ref={photoRef}>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/seanoh2026_square.jpg`}
                        alt="Portrait of Sean Oh"
                        width="808"
                        height="738"
                        loading="lazy"
                    />
                    <div className="about__sheen iri-sheen" aria-hidden="true" />
                </figure>

                <div className="about__text">
                    <p className="about__quote">
                        I develop responsive websites, integrate <em>REST APIs</em>, and troubleshoot the
                        data workflows behind them.
                    </p>
                    <div className="about__body">
                        <p>
                            I'm an entry-level software engineer working across frontend and integrations. At
                            Franchise Focused Marketing I build and maintain production websites and landing
                            pages, customize WordPress themes, and connect lead forms to CRMs through APIs,
                            webhooks, and Zapier.
                        </p>
                        <p>
                            Outside work, my own projects are where I go deeper on React and full-stack
                            development, from a calorie-tracking app with its own REST API to small frontends
                            built around public data.
                        </p>
                    </div>
                    <dl className="about__facts">
                        {facts.map((fact) => (
                            <div className="about__fact" key={fact.term}>
                                <dt className="label">{fact.term}</dt>
                                <dd>{fact.detail}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </Chapter>
    );
}
