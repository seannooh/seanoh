import React from "react";
import "./ThemeToggle.css";

// Half-filled circle that turns over when the theme changes.
export default function ThemeToggle({ theme, onToggle, showLabel = false, className = "" }) {
    const next = theme === "light" ? "dark" : "light";
    const label = `${next === "light" ? "Light" : "Dark"} mode`;

    return (
        <button
            type="button"
            className={`theme-toggle ${className}`}
            onClick={onToggle}
            aria-label={`Switch to ${next} mode`}
            title={`Switch to ${next} mode`}
        >
            <span className={`theme-toggle__icon ${theme === "light" ? "is-light" : ""}`} aria-hidden="true" />
            {showLabel && <span aria-hidden="true">{label}</span>}
        </button>
    );
}
