import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import "./login.css"


const Login = () => {
    const navigate = useNavigate();
    const backHome = () => {
      navigate("/");
    };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    navigate("/homepage")
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4040/post/login", {
        username,
        password,
      });

      if (response.data.success) {
        // Successful login, navigate to the dashboard or desired page
        navigate("/");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred during login");
    }
  };

  return (
    <>
    <div className="backhome" onClick={backHome}>
        <BiArrowBack />
      </div>
    <div className="login-container">
       
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;
