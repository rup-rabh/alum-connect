// SignUp.jsx
import React from "react";
import { SignCard } from "./signcard";

const SignUp = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign-up logic
  };

  return (
    <div className="signup-container">
      <SignCard
        heading="Create Account"
        about="Please fill in the details below to create an account."
        buttonText="Create Account"
        linkText="Already have an account?"
        linkUrl="Sign In"
        to="/signin"
        onClick={handleSignUp}
      >
        <input
          type="text"
          placeholder="First Name"
          className="signcard-input"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="signcard-input"
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="signcard-input"
          required
        />
        <input
          type="email"
          placeholder="Email ID"
          className="signcard-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="signcard-input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="signcard-input"
          required
        />
      </SignCard>
    </div>
  );
};

export default SignUp;
