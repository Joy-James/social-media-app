import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as BiIcons from 'react-icons/bi';
import "./likes.css"

function CommentComponent({ post_id }) {
  const [showInput, setShowInput] = useState(false);
  const [comment, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true); // New state variable for comments visibility

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4050/posts/comment', {
        comment: comment,
        post_id,
      }, { withCredentials: true });

      console.log('Comment submitted:', response.data);

      setCommentText('');
      setShowInput(false);
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`http://localhost:4050/posts/comment/post/${post_id}`, {
          withCredentials: true,
        });
        console.log(response.data)
        setComments(response.data);
    
      } catch (error) {
        console.log('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [post_id]);

  
  return (
    <div>
      <BiIcons.BiComment onClick={handleToggleInput} />
      <BiIcons.BiShow onClick={handleToggleComments} /> {/* New comment icon to toggle visibility */}

      {showInput && (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleInputChange}
            placeholder="Type your comment..."
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Conditionally render comments */}
      {showComments && (
       <div>
       {comments && comments.length > 0 ? (
         comments.map((comment) => (
           <div key={comment.comment_id} className='comment-section'>
             <p>{comment.comment}</p>
           </div>
         ))
       ) : (
         <p className='comment-section no-comments'>No comments yet.</p>
       )}
     </div>
     
      )}
    </div>
  );
}

export default CommentComponent;
