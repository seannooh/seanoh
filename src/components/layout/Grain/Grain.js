import React from "react";
import "./Grain.css";

// Faint film grain behind the content. The noise tile is drawn once; the
// layer just jumps between offsets, so the flicker is compositor-only.
export default function Grain() {
    return <div className="grain" aria-hidden="true" />;
}
