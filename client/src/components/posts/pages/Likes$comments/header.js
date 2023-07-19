import React, { useEffect, useState } from 'react';

import axios from 'axios';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import '../../homepage.css'


const Header = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setcomment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false); 
  useEffect(() => {
    axios.get('http://localhost:4050/posts', { withCredentials: true })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  const handleLike = async (post_id) => {
    try {

      const response = await axios.post(`http://localhost:4050/createLike`, {
        post_id
      }, { withCredentials: true });
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

  const handleComment = async (post_id) => {
    try {
      const commentValue=comment
      const response = await axios.post(
        'http://localhost:4050/posts/comment',
        {
          post_id: post_id,
          comment: comment,
        },
        { withCredentials: true }
      );

      const { success, comment } = response.data;

      if (success && comment) {
        const updatedPosts = posts.map((post) =>
          post.post_id === post_id
            ? {
              ...post,
              comments: [...(post.comments || []), comment], // Add the new comment to the comments array
            }
            : post
        );
        setPosts(updatedPosts);
        setcomment(''); // Clear the comment text after submitting
        setShowCommentInput((prevState) => !prevState)
      }
    } catch (error) {
      console.log('Error submitting the comment:', error);
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

              {post.imageUrl && <img src={post.imageUrl} alt='post' />}
              {post.content && <p>{post.content}</p>}
              <div className="post-footer">
                <div className="icons">
                  <BiIcons.BiLike onClick={() => handleLike(post.post_id)} className='react-icons' />
                  <BiIcons.BiDislike onClick={() => handleRemoveLike(post.post_id)} className='react-icons' />
                  < AiIcons.AiOutlineComment onClick={() => handleComment(post.post_id)} className='react-icons' />
                  <BiIcons.BiShareAlt className='react-icons' />

                </div>
               {/* Show comment input section only when showCommentInput is true */}
               {showCommentInput && (
                  <div className='comments'>
                    {post.comments && post.comments.length > 0 && (
                      <div className='comments'>
                        {post.comments.map((comment) => (
                          <p key={comment.comment_id} className='comment'>
                            {comment.comment}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className='comment-input'>
                      <input
                        type='text'
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                      />
                      <button onClick={() => handleComment(post.post_id)}>Post</button>
                    </div>

                  </div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );


}

export default Header


