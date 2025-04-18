import React from "react";
import { Link } from 'react-scroll';

export default function Bar() {

    return (
        <div className="bar">
            <div className="text-container">
                <h1>Sean Oh</h1>
                <p>Full Stack Developer</p>
            </div>
            <div className="navigation">
                <Link to="about" smooth={true} duration={500}>About Me</Link>
                <Link to="skills" smooth={true} duration={500}>Skills</Link>
                <Link to="projects" smooth={true} duration={500}>Projects</Link>
                <Link to="contact" smooth={true} duration={500}>Contact Me</Link>
                <a
                    href="https://www.linkedin.com/in/sean-oh-0ba2042ab/"
                    target="_blank"
                    rel="nopener noreferrer"    
                >
                <img src={`${process.env.PUBLIC_URL}/images/linkedinlogo.png`} alt="LinkedIn"/>
                </a>
                <a
                    href="https://github.com/seannooh"
                    target="_blank"
                    rel="nopener noreferrer"    
                >
                <img src={`${process.env.PUBLIC_URL}/images/githublogo.png`} alt="LinkedIn"/>
                </a>
            </div>
        </div>
    );
}