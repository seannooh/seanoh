import React from "react";

export default function About() {
    return (
        <div className="about" id="about">
            <div className="about-left">
                <img src={`${process.env.PUBLIC_URL}/images/me-ffm.jpg`} alt="pic" className="profile-pic"/>
            </div>
            <div className="about-right">
                <h2>About Me</h2>
                <p className="paragraph">
                    I am an aspiring Software Engineer with a strong background in web development, particularly in frontend development. 
                    I am passionate about building dynamic, user-friendly interfaces and creating seamless user experiences. 
                    I am always motivated to continue learning and improving my skills in modern web technologies.
                    I recently graduated from the University of Redlands with a Bachelor of Science in Computer Science and a 
                    minor in Mathematics in April 2025.
                </p>
            </div>
        </div>
    );
}