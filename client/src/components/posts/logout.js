import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    setIsLoading(true);
    setError(null);

    axios.get('http://localhost:4040/logout', { withCredentials: true })
      .then((response) => {
        console.log(response)
        // Handle successful logout
        // Example actions:
        // Redirect the user to the login page or any other desired page
        window.location.href = '/login';
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && <p>Logging out...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Logout;
