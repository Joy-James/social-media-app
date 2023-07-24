
import './notification.css'; 

import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [dummyNotifications, setDummyNotifications] = useState([]);

  useEffect(() => {
    // Fetch dummy notifications data (replace this with your actual API call)
    const fetchNotifications = () => {
      // Simulating API call delay
      setTimeout(() => {
        const dummyData = [
          {
            id: 1,
            message: 'You have a new follower!',
            timestamp: '2023-07-19T12:34:56Z',
          },
          {
            id: 2,
            message: 'Your post has been liked.',
            timestamp: '2023-07-18T15:45:12Z',
          },
          {
            id: 3,
            message: 'Someone mentioned you in a comment.',
            timestamp: '2023-07-17T08:22:30Z',
          },
        ];
        setDummyNotifications(dummyData);
      }, 1000);
    };

    fetchNotifications();
  }, []); // Add dummyNotifications to the dependency array

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {dummyNotifications.length === 0 ? (
        <p className="no-notifications">No new notifications.</p>
      ) : (
        <ul className="notifications-list">
          {dummyNotifications.map((notification) => (
            <li key={notification.id} className="notifications-item">
              <p>{notification.message}</p>
              <small>{notification.timestamp}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
