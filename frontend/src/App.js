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
import Mentor_Dashboard from "./screens/Mentor_Dashboard";
import Mentor_Registration from "./screens/Mentor_Registration";
import InternApplications from "./screens/InternApplications";
import Mentee_Dashboard from "./screens/Mentee_Dashboard";
import Activities from "./screens/Activities";
import AboutUs from "./screens/AboutUs";

function App() {
  return (
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
          <Route path="/mentorDashboard" element={<Mentor_Dashboard />} />
          <Route path="/mentorRegistration" element={<Mentor_Registration/>} />  
          <Route   path="/intern-applications/:internshipId"  element={<InternApplications />}/>
          <Route path="/menteeDashboard" element={<Mentee_Dashboard/>}   />
          <Route path="/activities" element={<Activities/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
        </Routes>
      </Router>
  );
}

export default App;
