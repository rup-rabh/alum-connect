// SignUp.jsx
import React from 'react';
import { SignCard } from './signcard'; // Adjust the import path if needed
import { useNavigate } from 'react-router-dom';
import "./sign.css";

const SignUp = () => {
    const navigate = useNavigate();

    const handleSignUpClick = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Add your sign-up logic here (e.g., API call)
        alert("Account created!");
        navigate("/signin"); // Redirect to sign-in after successful registration
    };

    return (
        <div className="signin-container">
        <SignCard
            heading="Create Account"
            about="Please fill in the details below to create an account."
            buttonText="Create Account"
            linkText="Already have an account?"
            linkUrl="Sign In"
            to="/signin"
            onClick={handleSignUpClick}
        >
            <input type="text" placeholder="Username" className="signcard-input" required />
            <input type="text" placeholder="First Name" className="signcard-input" required />
            <input type="text" placeholder="Last Name" className="signcard-input" required />
            <input type="email" placeholder="Email ID" className="signcard-input" required />
            <input type="password" placeholder="Password" className="signcard-input" required />
        </SignCard>
        </div>
    );
};

export default SignUp;