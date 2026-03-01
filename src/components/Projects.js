import React from "react";

export default function Projects() {

    return (
        <div className="projects" id="projects">
            <h2>Personal Projects</h2>
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
            
            <h2>Professional Projects</h2>
            <div className="card-container">
                <a href="https://knowlific.reachsites.co/" target="_blank" rel="noopener noreferrer">
                    <div className="card">
                        <h3>Knowlific</h3>
                            <p>
                                Created a responsive WordPress website for Knowlific, an online platform offering 
                                engaging children’s learning materials.
                            </p>
                        <div>
                            <p className="language">WordPress</p>
                            <p className="language">HTML</p>
                            <p className="language">JavaScript</p>
                            <p className="language">CSS</p>
                        </div>
                    </div>
                </a>
                <a href="https://kommunity.reachsites.co/" target="_blank" rel="noopener noreferrer">
                    <div className="card">
                        <h3>Kommunity</h3>
                        <p>
                            Developed a custom website for Kommunity Fitness using WordPress, creating a professional 
                            online presence for a growing fitness brand.
                        </p>
                        <div>
                            <p className="language">WordPress</p>
                            <p className="language">HTML</p>
                            <p className="language">JavaScript</p>
                            <p className="language">CSS</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}