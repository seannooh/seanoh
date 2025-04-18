import React from "react";

export default function Projects() {

    return (
        <div className="projects" id="projects">
            <h2>My Projects</h2>
            <div className="card-container">
                <a href="https://github.com/seannooh/TrackIt" target="_blank" rel="noopener noreferrer">
                    <div className="card">
                        <h3>Fitness App</h3>
                        <p>
                            Senior Capstone Project: Fitness App built with React and Node.js,
                            similar to MyFitnessPal.
                        </p>
                        <div>
                            <p className="language">React</p>
                            <p className="language">NodeJS</p>
                        </div>
                    </div>
                </a>
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