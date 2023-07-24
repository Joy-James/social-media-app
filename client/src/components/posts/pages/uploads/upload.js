import axios from 'axios';
import React, { useState } from 'react';
import "./upload.css"
function CreatePost() {
  const [image, setImage] = useState('');
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [content, setContent] = useState('');
  const preset_key = 'o9nibh54';
  const cloudname = 'dxm4vnr8z';



  const handleFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', preset_key);
  
    if (file && file.type.includes('image')) {
      formData.append('file', file);
  
      axios
        .post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, formData)
        .then((res) => {
          console.log(res.data.secure_url);
          const imageUrl = res.data.secure_url;
          setImage(imageUrl);
        })
        .catch((error) => {
          console.log('Error uploading image:', error);
        });
    } else {
      console.log('Invalid file format. Please select an image file.');
    }
  };
  

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const createPost = async () => {
    try {
      if (image && content) {
        // If both image and content are provided
        const response = await axios.post(
          'http://localhost:4050/posts/create',
          {
            imageUrl: image,
            content: content,
          },
          { withCredentials: true }
        );
        console.log('Post with image and content created successfully:', response.data);
      } else if (image) {
        // If only the image is provided
        const response = await axios.post(
          'http://localhost:4050/posts/create',
          {
            imageUrl: image,
          },
          { withCredentials: true }
        );
        console.log('Post with image created successfully:', response.data);
      } else if (content) {
        // If only the content is provided
        const response = await axios.post(
          'http://localhost:4050/posts/create',
          {
            content: content,
          },
          { withCredentials: true }
        );
        console.log('Post with content created successfully:', response.data);
      } else {
        console.log('No image or content provided.');
        return;
      }
      setIsPostCreated(true);
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };
  

  return (
    <div className="upload-container">
    <div className="upload-table">
      <div className="input">
        <input type="file" name="image" onChange={handleFile} className="file-input" />
        {image && <img src={image} className="upload-image" alt="upload" />}
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write something..."
          className="text-area"
        />
        <button onClick={createPost} disabled={!image || !content} className="create-button">
          Create Post
        </button>
        {isPostCreated && <p className="success-message">Post created successfully!</p>}
      </div>
    </div>
  </div>
  );
}

export default CreatePost;
