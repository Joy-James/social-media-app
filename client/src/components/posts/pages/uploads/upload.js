import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CreatePost() {
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const preset_key = 'o9nibh54';
  const cloudname = 'dxm4vnr8z';

  useEffect(() => {
    const fetchUserProfileID = async () => {
      try {
        const response = await axios.get('http://localhost:4040/users/userProfileID');
        console.log(response)
      } catch (error) {
        console.log('Error fetching userProfileID:', error);
      }
    };

    fetchUserProfileID();
  }, []);

  const handleFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, formData)
      .then((res) => {
        console.log(res.data.secure_url)
        const imageUrl = res.data.secure_url;
        setImage(imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const createPost = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4050/posts/create',
        {
          imageUrl: image,
          content: content,
        },
        { withCredentials: true }
      );

      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };

  return (
    <div className='upload'>
      <div className='d-flex justify-content-center bg-dark vh-300'>
        <div className='w-25 bg-white mt-5 p-5 content-container'>
          <input type='file' name='image' onChange={handleFile} />
          {image && <img src={image} className='w-100 h-100' alt='upload' />}
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder='Write something...'
          />
          <button onClick={createPost} disabled={!image || !content}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
