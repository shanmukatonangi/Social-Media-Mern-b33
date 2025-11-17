import React, { useState } from 'react';
import API from '../api';

export default function CreatePost({ onCreate }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null); // store file object

  const submit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      const resp = await API.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCaption('');
      setImage(null);
      e.target.reset();
      if (onCreate) onCreate(resp.data);
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    }
  };

  return (
    <form className="create-post" onSubmit={submit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
      />
      <button type="submit">Post</button>
    </form>
  );
}
