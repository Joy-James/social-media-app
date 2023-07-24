import React, { useEffect, useState } from 'react';

import racoon from "../../../resources/Fondos de pantalla.jpg"
import axios from 'axios';

import '../../homepage/homepage.css'
import SuggestedFollow from '../../homepage/sidebar';

import LikeButton from './like';

import CommentComponent from './comment';


const Header = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4050/posts', { withCredentials: true })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




  return (
    <>
      <div className={`Header`}>
        < div className='parent-container'>
          <div className='all-posts'>

            <div className='alll-posts'>
              {posts?.map((post) => (
                <div key={post.post_id} className="post">
                  <div className="post-header">
                    <div className="profile-details">
                    <img src={racoon} alt='racoon'/>
                    <p>joy_is_voiced</p>
                    </div>

                  </div>
                  {post.content && <p className='content'>{post.content}</p>}
                  {post.imageUrl && <img src={post.imageUrl} alt='post' />}
               
                
                  <div className="post-footer">
                    <div className="action-buttons">
                      <LikeButton post_id={post.post_id} />
                   
                      <CommentComponent post_id={post.post_id}  />

                    </div>
                   
                    
                  </div>


                </div>


              ))}
            </div>

          </div>


          <SuggestedFollow />
        </div>

      </div>
    </>
  );


}

export default Header


