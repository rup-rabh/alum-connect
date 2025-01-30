import React from 'react';
import { SignUpCard } from './signupcard';
import './sign.css';

function App() {
  const handleSignUp = (event) => {
    event.preventDefault();
    // Handle sign-up logic
  };

  return (
    <div className="signup-container">

      <SignUpCard 
        heading="Create Account" 
        about="Please fill in the details below to create an account."
        buttonText="Create Account"
        linkText="Already have an account?"
        linkUrl="Sign In"
        to="/signin"
        onClick={handleSignUp}
      />
    </div>
  );
}

export default App;