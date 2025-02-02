import React, { useState } from "react";
import { SignCard } from "./signcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setLoading]=useState(false)

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading((isLoading)=>true)
    const response = await axios.post("http://localhost:3000/api/auth/signup", {
      username,
      email,
      password,
    });
    console.log(response.data.message)
    localStorage.setItem("token", response.data.token);
    navigate("/home");
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
        onSubmit={handleSignUp}
        isLoading={isLoading}
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
      </SignCard>
    </div>
  );
};

export default SignUp;
