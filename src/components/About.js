import React from "react";

export default function About() {
    return (
        <div className="about" id="about">
            <img src={`${process.env.PUBLIC_URL}/images/me.jpg`} alt="pic" className="profile-pic"/>
            <div className="about-left">
                <h2>About Me</h2>
                <p className="paragraph">
                    I am a Full Stack Developer with a passion for 
                    frontend development. I am committed to creating 
                    dynamic user interfaces and motivated to continue
                    exploring and learning more about web development.
                    Currently, I am completing my senior year at the 
                    University of Redlands, where I am pursuing a BS in
                    Computer Science and a minor in Mathematics, with
                    plans to graduate in April 2025. 

                </p>
            </div>
        </div>
    );
}