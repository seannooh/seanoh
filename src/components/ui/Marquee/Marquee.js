import React, { useEffect, useRef, useState } from "react";
import useIridescent from "../../../hooks/useIridescent.js";
import "./Marquee.css";

// Infinite marquee. Two copies of the list scroll as one strip; the second
// is hidden from assistive tech. Pauses on hover, keyboard focus, and while
// off-screen (so it costs nothing elsewhere on the page), and stays still
// with reduced motion.
export default function Marquee({ items, label }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useIridescent(ref);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const renderList = (hidden) => (
        <ul className="marquee__list" aria-hidden={hidden || undefined}>
            {items.map((item) => (
                <li className="marquee__item iri-text" key={item}>
                    {item}
                </li>
            ))}
        </ul>
    );

    return (
        <section
            className={`marquee iri ${visible ? "" : "is-offscreen"}`}
            ref={ref}
            aria-label={label}
            tabIndex={0}
        >
            <div className="marquee__track" style={{ "--marquee-duration": `${items.length * 2.6}s` }}>
                {renderList(false)}
                {renderList(true)}
            </div>
        </section>
    );
}
