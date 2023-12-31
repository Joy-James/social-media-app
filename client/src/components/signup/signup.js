import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
 
 
  const backHome = () => {
    navigate("/");
  };
  const [full_name, setfull_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setError("Password and Confirm Password do not match");
      return;
    }
    if (!full_name || !username || !email || !city || !password || !confirm_password) {
      setError("Please fill in all the fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4040/usercd /signup", {
        full_name,
        username,
        email,
        city,
        password,
        confirm_password,
      });
      console.log(response.data);
      // Handle successful signup and navigate to another page
      navigate("/panel/allposts");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setError("An error occurred during sign up");
    }
  };

  return (
    <>
   
    <div className="register-user">
    <div className="backhome" onClick={backHome}>
        <BiArrowBack />
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Full name"
          className="full-name"
          value={full_name}
          onChange={(e) => setfull_name(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          className="input-box"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="text"
          placeholder="city"
          className="input-box"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-box"
          value={confirm_password}
          onChange={(e) => setconfirm_password(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button className="sign-btn" type="submit" >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
    </>
  );
};

export default SignUp;
