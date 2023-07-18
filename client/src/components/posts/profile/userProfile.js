import "./profile.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from "../../resources/profile.png";





function UserProfile({ UserprofileID }) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserSpecificPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4050/posts/${UserprofileID}`);
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

    fetchUserSpecificPosts();
  }, [UserprofileID]);

  return (
<>
    <div className="user-profile">
       <div className="post-header">
          <img src={profile} alt='profile' className='picture'/>
          <div className="post-count">
            <p><span>50</span> posts</p>
            <p><span>50</span> friends</p>
         </div>
         </div>
         <div className='details'>
          <p className="username">username</p>
           <p className="email">email</p>
           <p className="city">city</p>
        </div>
        </div>
    <div>
      <h2>User Specific Posts</h2>
      {userPosts.length === 0 ? (
        <p>No posts found for this user.</p>
      ) : (
        <div>
          {userPosts.map((post) => (
            <div key={post.post_id} className="post-container">
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
              <p className="post-content">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}



  // return (
  //   <>
  //   <div className="user-profile">
  //     <div className="post-header">
  //       <img src={profile} alt='profile' className='picture'/>
  //       <div className="post-count">
  //         <p><span>50</span> posts</p>
  //         <p><span>50</span> friends</p>
  //       </div>
  //     </div>
  //     <div className='details'>
  //       <p className="username">username</p>
  //       <p className="email">email</p>
  //       <p className="city">city</p>
  //     </div>
  //   </div>
  //   <div className='user-post'>
  //     <div className='actual-post'>
  //    <img src={food} alt='post'/>
  //     <p>cravinngs!!</p>
  //     </div>
  //     <div>
  //    <img src={art} alt='post'/>
  //     <p>cravinngs!!</p>
  //     </div>
  //     <div>
  //    <img src={food2} alt='post'/>
  //     <p>cravinngs!!</p>
  //     </div>
  //   </div>
  //   </>
  // );
//}

export default UserProfile;
