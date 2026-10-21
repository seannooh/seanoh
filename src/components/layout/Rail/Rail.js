import React, { useEffect, useRef, useState } from "react";
import { chapters, externalLinks, links } from "../../../data/site.js";
import useChapterProgress from "../../../hooks/useChapterProgress.js";
import useTheme from "../../../hooks/useTheme.js";
import { getSmoothScroll } from "../../../lib/smoothScroll.js";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle.js";
import "./Rail.css";

const chapterIds = chapters.map((chapter) => chapter.id);
const DESKTOP = "(min-width: 1100px)";

// Desktop: a fixed left rail; its name block appears once the hero scrolls away.
// Tablet/phone: a slim top bar with a full-screen menu sheet.
export default function Rail() {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const toggleRef = useRef(null);
    const { active, docked } = useChapterProgress(chapterIds, "top", headerRef);
    const [theme, toggleTheme] = useTheme();
    const activeIndex = chapterIds.indexOf(active);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const header = headerRef.current;
        const desktop = window.matchMedia(DESKTOP);
        document.documentElement.style.overflow = "hidden";
        getSmoothScroll()?.stop();
        header.querySelector(".rail__link")?.focus();

        // Escape closes; Tab stays inside the open menu.
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                toggleRef.current?.focus();
                return;
            }
            if (event.key !== "Tab") return;
            const focusable = header.querySelectorAll("a, button");
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        const onBreakpoint = (event) => {
            if (event.matches) setMenuOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        desktop.addEventListener("change", onBreakpoint);

        return () => {
            document.documentElement.style.overflow = "";
            getSmoothScroll()?.start();
            document.removeEventListener("keydown", onKeyDown);
            desktop.removeEventListener("change", onBreakpoint);
        };
    }, [menuOpen]);

    const classes = ["rail", docked && "is-docked", menuOpen && "is-open"]
        .filter(Boolean)
        .join(" ");

    return (
        <header className={classes} ref={headerRef}>
            <div className="rail__bar">
                <a href="#top" className="rail__mark" onClick={closeMenu}>
                    <span className="rail__name">Sean Oh</span>
                    <span className="rail__role label">Software Engineer</span>
                </a>

                <div className="rail__actions">
                    <ThemeToggle theme={theme} onToggle={toggleTheme} className="rail__theme--bar" />
                    <button
                        type="button"
                        className="rail__toggle"
                        ref={toggleRef}
                        aria-expanded={menuOpen}
                        aria-controls="site-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span className="label">{menuOpen ? "Close" : "Menu"}</span>
                        <span className="rail__icon" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <nav id="site-menu" className="rail__nav" aria-label="Primary" data-lenis-prevent>
                <ol className="rail__list">
                    {chapters.map((chapter, index) => {
                        const state =
                            index === activeIndex ? "is-active" : index < activeIndex ? "is-read" : "";
                        return (
                            <li key={chapter.id}>
                                <a
                                    href={`#${chapter.id}`}
                                    className={`rail__link ${state}`}
                                    aria-current={index === activeIndex ? "location" : undefined}
                                    onClick={closeMenu}
                                >
                                    <span className="rail__num">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="rail__label">{chapter.label}</span>
                                    <span className="rail__track" aria-hidden="true">
                                        <span className="rail__fill" />
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ol>

                <div className="rail__footer">
                    <ThemeToggle theme={theme} onToggle={toggleTheme} showLabel className="rail__theme--rail" />
                    <ul className="rail__external">
                        {externalLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="link-line"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.label} <span className="arrow arrow--out" aria-hidden="true">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href={`mailto:${links.email}`} className="rail__email link-line">
                        {links.email}
                    </a>
                </div>
            </nav>
        </header>
    );
}
