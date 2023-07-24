import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as BiIcons from 'react-icons/bi';

function LikeButton({ post_id }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {

    async function fetchLikeStatus() {
      try {
        const response = await axios.get(`http://localhost:4050/checkLikeStatus/${post_id}`, {
          withCredentials: true,
        });
        setLiked(response.data.liked);
      } catch (error) {
        console.log('Error fetching like status:', error);
      }
    }

    fetchLikeStatus();
  }, [post_id]);

  const handleLike = async () => {
    try {
      if (liked) {
       
        await axios.delete('http://localhost:4050/removeLike', {
          data: {
            post_id: post_id,
          },
          withCredentials: true,
        });
      
        setLiked(false);
      } else {
      
        await axios.post(`http://localhost:4050/createLike`, {
          post_id,
        }, {
          withCredentials: true,
        });
     
        setLiked(true);
      }
    } catch (error) {
      console.log('Error handling like:', error);
    }
  };

  return (
    <BiIcons.BiLike
      onClick={handleLike}
      color={liked ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)'}
      fill={liked ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)'}
    />
  );
}

export default LikeButton;
