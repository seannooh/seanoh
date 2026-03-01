import React, { useState } from "react";
import { Link } from "react-scroll";

export default function Bar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bar">
      <div className="text-container">
        <h1>Sean Oh</h1>
        <p>Software Engineer | Web Developer</p>
      </div>

      <div 
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <div className={`navigation ${menuOpen ? "active" : ""}`}>
        <Link to="about" smooth duration={500}>About Me</Link>
        <Link to="skills" smooth duration={500}>Skills</Link>
        <Link to="projects" smooth duration={500}>Projects</Link>
        <Link to="contact" smooth duration={500}>Contact Me</Link>

        <a
          href="https://www.linkedin.com/in/sean-oh-0ba2042ab/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${process.env.PUBLIC_URL}/images/linkedinlogo.png`} alt="LinkedIn"/>
        </a>

        <a
          href="https://github.com/seannooh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${process.env.PUBLIC_URL}/images/githublogo.png`} alt="GitHub"/>
        </a>
      </div>
    </div>
  );
}