import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
     
      await axios.get('http://localhost:4040/logout', {
       
      },{withCredentials:true});


      navigate('/'); 
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
