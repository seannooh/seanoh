import { useCallback, useState } from "react";

// Light/dark theme. Dark is the default; public/index.html sets data-theme
// before first paint (the visitor's saved choice, else dark).
const STORAGE_KEY = "theme";
const THEME_COLORS = { dark: "#0b1524", light: "#eff1f0" };

function currentTheme() {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

export default function useTheme() {
    const [theme, setTheme] = useState(currentTheme);

    const toggle = useCallback(() => {
        const next = currentTheme() === "light" ? "dark" : "light";
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage unavailable: the choice lasts for this page view only.
        }

        // Cross-fade between themes where the View Transitions API exists.
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (document.startViewTransition && !reduceMotion) {
            document.startViewTransition(() => applyTheme(next));
        } else {
            applyTheme(next);
        }
        setTheme(next);
    }, []);

    return [theme, toggle];
}
