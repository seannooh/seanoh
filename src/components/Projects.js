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
                            <p className="language">CSS</p>
                            <p className="language">NodeJS</p>
                        </div>
                    </div>
                </a>
                <a href="https://github.com/seannooh/moviesearchapp" target="_blank" rel="noopener noreferrer">
                    <div className="card">
                    <h3>Movie App</h3>
                    <p>
                        Frontend project that allows users to search for movies by title and view detailed information. Built using the OMDb API to fetch real-time movie data.
                    </p>
                    <div>
                        <p className="language">React</p>
                        <p className="language">CSS</p>
                    </div>
                </div>
                </a>
                <a href="https://github.com/seannooh/nfl-team-app" target="_blank" rel="noopener noreferrer">
                    <div className="card">
                        <h3>NFL Team Builder App</h3>
                        <p>
                            Frontend project where users can build their NFL team! Inspired from Snapchat and TikTok filters.
                        </p>
                        <div>
                            <p className="language">React</p>
                            <p className="language">CSS</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}