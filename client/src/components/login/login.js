import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4040/user/login", {
        username,
        password,
      }, {withCredentials:true});

      if (response.data.message) {
      
        setSuccess("Logged in successfully!");
        navigate("/panel/allposts");
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
        <form>
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
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
