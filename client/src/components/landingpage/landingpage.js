import React from "react";
import { useNavigate  } from "react-router-dom";


import "./landing.css"
const LandingPage = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
    <div className="container">
      <div className="budde-image">
     

      </div>
      
      <div className="register">
      <h1>Happening now</h1>
      <h3>Join <span>BUDDEE</span> today</h3>
      <p>Please select an option:</p>
       
        <button onClick={handleSignInClick}>signup</button>
        <button onClick={handleLogin}>Login</button>
      
      
      </div>
    </div>



    </>
  );
};

export default LandingPage;
