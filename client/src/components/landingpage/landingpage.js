import React from "react";
import { useNavigate  } from "react-router-dom";
import twitter from "../resources/Twitter_bird_logo_classic_round_sticker___Zazzle-removebg-preview.png"
import Donut from "../resources/Printable_Donut_Buddies-removebg-preview.png"
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
     
     <img src={Donut} alt="buddies"/>
      </div>
      
      <div className="register">
      <img src={twitter} alt="buddies" className="twitter"/>
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
