import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner label">
                <span>© {new Date().getFullYear()} Sean Oh</span>
                <a href="#top" className="link-line">
                    Back to top <span className="arrow" aria-hidden="true">↑</span>
                </a>
            </div>
        </footer>
    );
}
