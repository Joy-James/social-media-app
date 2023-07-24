import "./profile.css";
import { AiOutlineDelete } from 'react-icons/ai';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from "../../resources/profile.png";

function UserProfile() {
  const [userPosts, setUserPosts] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user-specific posts
    const fetchUserSpecificPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4050/posts/Usersposts`, { withCredentials: true });
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
        const response = await axios.get(`http://localhost:4040/users/friends`, { withCredentials: true });
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
        const response = await axios.get(`http://localhost:4040/user/`, {
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
  }, []);

  const handleDeletePost = async (post_id) => {
    try {
      await axios.delete(`http://localhost:4050/posts/delete/${post_id}`, { withCredentials: true });
      // Refresh the posts list after successful deletion
      const updatedPosts = userPosts.filter((post) => post.post_id !== post_id);
      setUserPosts(updatedPosts);
    } catch (error) {
      console.log('Error deleting the post:', error);
    }
  };

  return (
    <>
      <div className="user-profile">
        <div className="post-header">
          <img src={profile} alt='profile' className='picture' />
          <div className="post-count">
            {userPosts && userPosts.length > 0 ? (
              <p className="buddie-data">{userPosts.length !== undefined ? <span>{userPosts.length}</span> : 'Loading...'} POSTS</p>
            ) : (
              <p className="buddie-data">No Posts</p>
            )}

            {userFriends && userFriends.length > 0 ? (
              <p className="buddie-data"> {userFriends.length !== undefined ? <span>{userFriends.length}</span> : 'Loading...'} BUDDIES</p>
            ) : (
              <p className="buddie-data"> 0 BUDDIES</p>
            )}
          </div>
        </div>
        <div className='details'>
          {userProfile ? (
            <>
              <p className="username">{userProfile?.full_name}</p>
              <p className="username">{userProfile?.username}</p>
              <p className="email">{userProfile?.email}</p>
              <p className="city">{userProfile?.city}</p>
            </>
          ) : (
            <p className="buddie-data"> Loading user information</p>
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
                <div className="post-actions">
                  {/* <AiOutlineEdit onClick={() => handleUpdatePost(post.post_id)} className="action-icon" /> */}
                  <AiOutlineDelete onClick={() => handleDeletePost(post.post_id)} className="action-icon" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>User Friends</h2>
        {userFriends && userFriends.length > 0 ? (


          <div>
            {userFriends.map((friend) => (
              <div key={friend.friendship_id} className="friend-container">
                <p>{friend.username}</p>
                {/* Add more friend details if available */}
              </div>
            ))}
          </div>
        ) : (
          <p>No friends found for this user.</p>
        )}
      </div>
    </>
  );
}

export default UserProfile;
