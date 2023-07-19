import React from 'react';
import axios from 'axios';

const Header = () => {
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4040/logout', { withCredentials: true });
      // Redirect the user to the login page or any other desired page
      window.location.href = '/login'; // Replace with your desired redirect URL
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle the error or show an error message to the user
    }
  };

  return (
    <>
      
      <button onClick={handleLogout}>Logout</button>
    
    </>
  );
};

export default Header;
