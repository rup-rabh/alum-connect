import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NavBar from "./screens/NavBar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import LinkedInCallback from "./components/LinkedInCallback";
import "./App.css";
import InternshipPage from "./screens/InternshipPage";
import JobDetails from "./screens/JobDetails";
import ProfilePage from "./screens/ProfilePage";
import { UserProvider, useUser } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        {/* Include the NavBar on every screen */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/linkedin/callback" element={<LinkedInCallback />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/internships" element={<InternshipPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
