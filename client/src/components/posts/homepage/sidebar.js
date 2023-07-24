import React from 'react';
import "./sidebar.css"
import racoon from "../../resources/Fondos de pantalla.jpg"

function SuggestedFollow() {
  // Replace the dummy data with real data fetched from your backend API
  const suggestedUsers = [
    { id: 1,  username: 'Bobo-Anne' },
    { id: 2, username: 'Cindy-Munja' },
    { id: 3, username: 'Raily-kenn' },
    { id: 3, username: 'Murugi-Munyi' },
    { id: 3, username: 'chris-Njoki' },
    { id: 3, username: 'Mary-Nimmo' },
    { id: 3, username: 'Paul-Gwayne' },
    { id: 3, username: 'Hennry-Kenn' },
    { id: 3, username: 'Willy-Hamm' },
    // Add more suggested users here
  ];

  return (
   
      <div className="suggested-follow-container">
        <h2 className='suggest-header'>Suggested Follow</h2>
        <div className='parent'>
      
        <ul className='suggested-users'>
          {suggestedUsers.map((user) => (
            
            <li key={user.id} className='suggested-user'>
                  <img src={racoon} alt='racoon' className='suggested-user-profilepic'/>
              <span className='suggesred-name'>{user.username}</span>
            </li>
          ))}
        </ul>
        
        <div className="follow-button-container">
          {suggestedUsers.map((user) => (
            <button
              key={user.id}
              className='follow-button'
            
            >
              Follow
            </button>
          ))}
        </div>
        </div>
      </div>
    );
  }

export default SuggestedFollow;
