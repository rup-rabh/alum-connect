// SignIn.jsx
import React from 'react';
import { SignCard } from './signcard';
import { useNavigate } from 'react-router-dom';
import './sign.css'; // Ensure you import the CSS file

const SignIn = () => {
    const navigate = useNavigate();

    const handleSignInClick = (e) => {
        e.preventDefault(); // Prevent default form submission
        alert("Sign In clicked!");
        navigate("/home"); // Redirect to home after sign in
    };

    return (
        <div className="signin-container"> {/* Add this div for background color */}
            <SignCard
                heading="Sign In"
                about="Please enter your credentials to sign in."
                buttonText="Sign In"
                linkText="Don't have an account?"
                linkUrl="Register"
                to="/register"
                onClick={handleSignInClick}
            />
        </div>
    );
};

export default SignIn;