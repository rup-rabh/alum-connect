import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NavBar from "./screens/NavBar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import LinkedInCallback from "./components/LinkedInCallback";
import "./App.css";
import Alum_internship from "./screens/Alum_internship";


function App() {
  return (
    <Router>
       {/* Include the NavBar on every screen */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/Home" element={<HomeScreen />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/linkedin/callback" element={<LinkedInCallback />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/alum_internship" element={<Alum_internship></Alum_internship>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
