import React from "react";

export default function Projects() {
    return (
        <div className="projects" id="projects">
            <h2>My Projects</h2>
            <div className="card-container">
                <div className="card">
                    <h3>Fitness App (In progress)</h3>
                    <p>
                        Senior Capstone Project: Fitness App built with React and Node.js,
                        similar to MyFitnessPal.
                    </p>
                    <div>
                        <p className="language">React</p>
                        <p className="language">NodeJS</p>
                    </div>
                </div>
                <div className="card">
                    <h3>Calculator</h3>
                    <p>
                        Simple calculator.
                    </p>
                    <div>
                        <p className="language">HTML</p>
                        <p className="language">JavaScript</p>
                        <p className="language">CSS</p>
                    </div>
                </div>
            </div>
        </div>
    );
}