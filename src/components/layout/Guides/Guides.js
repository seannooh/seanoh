import React from "react";
import "./Guides.css";

// Hairline column guides marking the content measure. They sit behind the
// page and line up with the edges of every chapter's content.
export default function Guides() {
    return (
        <div className="guides" aria-hidden="true">
            <div className="guides__frame" />
        </div>
    );
}
