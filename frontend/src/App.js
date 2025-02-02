import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NavBar from "./screens/NavBar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import "./App.css";


function App() {
  return (
    <Router>
       {/* Include the NavBar on every screen */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/Home" element={<HomeScreen />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
