import React, { useState } from "react";
import { SignCard } from "./signcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    if (!error) {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/signup", {
          username,
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } catch (err) {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const validatePassword = () => {
    if (confirmPassword && confirmPassword !== password) {
      setError("Passwords do not match.");
      setPassword(""); 
    } else {
      setError(null);
    }
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
          placeholder="Username"
          className="signcard-input"
          required
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email ID"
          className="signcard-input"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="signcard-input"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="signcard-input"
          required
          onChange={(event) => setConfirmPassword(event.target.value)}
          onBlur={validatePassword} 
        />
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "5px",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}
      </SignCard>
    </div>
  );
};

export default SignUp;
