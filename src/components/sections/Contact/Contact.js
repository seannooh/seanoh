import React, { useEffect, useRef, useState } from "react";
import Chapter from "../../ui/Chapter/Chapter.js";
import { links } from "../../../data/site.js";
import useIridescent from "../../../hooks/useIridescent.js";
import "./Contact.css";

const hints = {
    idle: "Click to copy",
    copied: "Copied ✓",
    selected: "Selected. Press ⌘C / Ctrl+C to copy",
};

export default function Contact() {
    const [status, setStatus] = useState("idle");
    const emailRef = useRef(null);
    const emailRowRef = useRef(null);
    useIridescent(emailRowRef);
    const timer = useRef(0);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(links.email);
            setStatus("copied");
        } catch {
            window.getSelection().selectAllChildren(emailRef.current);
            setStatus("selected");
        }
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setStatus("idle"), 2200);
    };

    return (
        <Chapter
            id="contact"
            className="contact"
            titleClassName="contact__title"
            title={
                <>
                    Let’s build
                    <br />
                    <em>something.</em>
                </>
            }
        >
            <div className="contact__email iri" ref={emailRowRef}>
                <button
                    type="button"
                    className={`contact__copy ${status !== "idle" ? "is-copied" : ""}`}
                    ref={emailRef}
                    onClick={copyEmail}
                >
                    {links.email}
                </button>
                <span className="label contact__hint" aria-live="polite">
                    {hints[status]}
                </span>
            </div>

            <ul className="contact__links">
                <li>
                    <a className="link-line" href={`mailto:${links.email}`}>
                        Open in mail app <span className="arrow arrow--out" aria-hidden="true">↗</span>
                    </a>
                </li>
                <li>
                    <a className="link-line" href={`tel:${links.phone.replace(/[^\d+]/g, "")}`}>
                        {links.phone}
                    </a>
                </li>
                <li>
                    <a className="link-line" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn <span className="arrow arrow--out" aria-hidden="true">↗</span>
                    </a>
                </li>
                <li>
                    <a className="link-line" href={links.github} target="_blank" rel="noopener noreferrer">
                        GitHub <span className="arrow arrow--out" aria-hidden="true">↗</span>
                    </a>
                </li>
                <li>
                    <a className="link-line" href={links.resume} target="_blank" rel="noopener noreferrer">
                        Résumé <span className="arrow arrow--out" aria-hidden="true">↗</span>
                    </a>
                </li>
            </ul>
        </Chapter>
    );
}
