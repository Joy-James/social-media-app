import React, { useEffect, useState } from 'react';

import axios from 'axios';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import './homepage.css'

const Header = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
         axios.get('http://localhost:4050/posts', {withCredentials:true})
        .then((response) => {
          setPosts(response.data.posts);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    



    
  const handleLike = async (post_id) => {
    try {
      
      const response = await axios.post(`http://localhost:4050/createLike`,{
       post_id     
      }, {withCredentials: true});
      console.log(response)

      const { LikeCount } = response.data;

    if (LikeCount === 0) {
      const updatedPosts = posts.map((post) =>
        post.post_id === post_id ? { ...post, liked: true } : post
      );
      setPosts(updatedPosts);
    }
  } catch (error) {
    console.log('Error liking the post:', error);
  }
};
      

  const handleRemoveLike = async (post_id) => {
    try {
      const response = await axios.delete(
        'http://localhost:4050/removeLike',
        {
          data: {
            post_id: post_id,
          },
          withCredentials: true,
        }
      );
      console.log(response);
  
      const updatedPosts = posts.map((post) =>
        post.post_id === post_id ? { ...post, liked: false } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log('Error removing the like:', error);
    }
  };
  
  

  
    return (
      <>
      <div className='all-posts'>
        <h1>My Social Media App</h1>
        <div>
          {posts?.map((post) => (
            <div key={post.post_id} className="post">
              <div className="post-header">
                <div className="profile-circle"></div>
              </div>
            
              {post.imageUrl && <img src={post.imageUrl} alt='post'/>}
              {post.content && <p>{post.content}</p>}
              <div className="post-footer">
                <div className="icons">
                  <i className="liked"><BiIcons.BiLike onClick={()=>handleLike(post.post_id)}  /></i>
                  <i className="dislike"><BiIcons.BiDislike onClick={()=>handleRemoveLike(post.post_id)}/></i>
                  <i className="fas fa-comment">< AiIcons.AiOutlineComment/></i>
                  <i className="fas fa-share"><BiIcons.BiShareAlt/></i>
              
                </div>
                <p>{post.likesCount} Likes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      </>
    );
    
  
}

export default Header


