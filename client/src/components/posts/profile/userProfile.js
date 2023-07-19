import "./profile.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from "../../resources/profile.png";

function UserProfile({ UserprofileID,username }) {
  const [userPosts, setUserPosts] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user-specific posts
    const fetchUserSpecificPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4050/posts/${UserprofileID}`, { withCredentials: true });
        const data = response.data;
        if (data.success) {
          setUserPosts(data.userPosts);
        } else {
          console.log('Failed to fetch user-specific posts.');
        }
      } catch (error) {
        console.log('Error fetching user-specific posts:', error);
      }
    };

    // Fetch user's friends
    const fetchUserFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:4040/users/${username}`, { withCredentials: true });
        const data = response.data;
        if (data.success) {
          setUserFriends(data.userFriends);
        } else {
          console.log('Failed to fetch user friends.');
        }
      } catch (error) {
        console.log('Error fetching user friends:', error);
      }
    };


    // Fetch user's profile
const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:4040/users/${UserprofileID}`, {
      withCredentials: true,
    });
    const data = response.data;
    if (data.success) {
      setUserProfile(data.userProfile);
    } else {
      console.log('Failed to fetch user profile.');
    }
  } catch (error) {
    console.log('Error fetching user profile:', error);
  }
};


    fetchUserSpecificPosts();
    fetchUserFriends();
    fetchUserProfile(); 
  }, [UserprofileID,  username]);

  return (
    <>
      <div className="user-profile">
        <div className="post-header">
          <img src={profile} alt='profile' className='picture' />
          <div className="post-count">
            <p><span>{userPosts.length}</span> posts</p>
            <p><span>{userFriends.length}</span> friends</p>
          </div>
        </div>
        <div className='details'>
          {userProfile?(
            <>
          <p className="username">{userProfile.full_name}</p>
          <p className="username">{userProfile.username}</p>
          <p className="email">{userProfile.email}</p>
          <p className="city">{userProfile.city}</p>
          </>
          ) :(
            <p>Loading user information</p>
          )}
        </div>
      </div>

      <div>
        <h2>User Specific Posts</h2>
        {userPosts.length === 0 ? (
          <p>No posts found for this user.</p>
        ) : (
          <div className="user-post">
            {userPosts.map((post) => (
              <div key={post.post_id} className="post-container">
                {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
                <p className="post-content">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>User Friends</h2>
        {userFriends.length === 0 ? (
          <p>No friends found for this user.</p>
        ) : (
          <div>
            {userFriends.map((friend) => (
              <div key={friend.friendship_id} className="friend-container">
                <p>{friend.username}</p>
                {/* Add more friend details if available */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;
