import React from "react";

export default function Skills() {
    const skills = [
        { name: "HTML", logo: `${process.env.PUBLIC_URL}/images/language_logo/htmllogo.png` },
        { name: "JavaScript", logo: `${process.env.PUBLIC_URL}/images/language_logo/javascriptlogo.png` },
        { name: "CSS", logo: `${process.env.PUBLIC_URL}/images/language_logo/csslogo.png` },
        { name: "PHP", logo: `${process.env.PUBLIC_URL}/images/language_logo/phplogo.png` },
        { name: "MySQL", logo: `${process.env.PUBLIC_URL}/images/language_logo/mysqllogo.png` },
        { name: "React", logo: `${process.env.PUBLIC_URL}/images/language_logo/reactlogo.png` },
        { name: "Node.js", logo: `${process.env.PUBLIC_URL}/images/language_logo/nodejslogo.png` },
        { name: "Java", logo: `${process.env.PUBLIC_URL}/images/language_logo/javalogo.png` },
    ];

    return (
        <div className="skills" id="skills">
            <h1>Skills</h1>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div className="skill-card" key={index}>
                        <img src={skill.logo} alt={skill.name} className="skill-logo"></img>
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}