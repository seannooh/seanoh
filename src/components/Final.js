import React from "react";

export default function Footer() {
    return (
        <footer>
            <a
                href="https://www.linkedin.com/in/sean-oh-0ba2042ab/"
                target="_blank"
                rel="nopener noreferrer"
            >
                <img src={`${process.env.PUBLIC_URL}/images/linkedinlogo.png`} alt="LinkedIn" style={{ width:"30px", height: "30px"}}/>
            </a>
            <a
                href="https://github.com/seannooh"
                target="_blank"
                rel="nopener noreferrer"
            >
                <img src={`${process.env.PUBLIC_URL}/images/githublogo.png`} alt="LinkedIn" style={{ width:"30px", height: "30px"}}/>
            </a>
        </footer>
    );
}