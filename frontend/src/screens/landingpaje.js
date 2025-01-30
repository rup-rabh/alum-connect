import React from 'react';
import './landingPage.css'; // Import the CSS file
import background from "../media/background.webp"

const LandingPage = () => {
    return (
        <section className="welcome-section">
            <h1>Welcome to Alumni Connect</h1>
            <p>Empowering connections, fostering growth, and building a stronger alumni community.</p>
            <button className="join-button">Join Our Network</button>
        </section>
    );
};

export default LandingPage;