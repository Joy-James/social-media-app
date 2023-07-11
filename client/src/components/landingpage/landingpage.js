import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./landing.css"
const LandingPage = () => {

  return (
    <>
    <div className="container">
      <h1>Welcome to the Landing Page</h1>
      <p>Please select an option:</p>
      <div>
        <Link to="/register">Sign Up</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>

    <Outlet/>

    </>
  );
};

export default LandingPage;
