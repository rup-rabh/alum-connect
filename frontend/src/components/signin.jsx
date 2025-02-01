// SignIn.jsx
import React from "react";
import { SignCard } from "./signcard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignInClick = async (e) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signin",
      {
        email,
        password,
      }
    );
    localStorage.setItem("token",response.data.token)
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
          onClick={(event)=>setEmail((email)=>event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="signcard-input"
          required
          onClick={(event)=>setPassword((password)=>event.target.value)}
        />
      </SignCard>
    </div>
  );
};

export default SignIn;
