// SignIn.jsx
import React from "react";
import { SignCard } from "./signcard";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignInClick = (e) => {
    e.preventDefault();
    alert("Sign In clicked!");
    navigate("/home");
  };

  return (
    <div className="signin-container">
      <SignCard
        heading="Sign In"
        about="Please enter your credentials to sign in."
        buttonText="Sign In"
        linkText="Don't have an account?"
        linkUrl="Register"
        to="/register"
        onClick={handleSignInClick}
      >
        <input
          type="text"
          placeholder="Email or Username"
          className="signcard-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="signcard-input"
          required
        />
      </SignCard>
    </div>
  );
};

export default SignIn;
