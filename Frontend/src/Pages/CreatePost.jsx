import React, { useState } from "react";
import API from "../api";

export default function CreatePost({ onCreate }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption && !image) return alert("Please add text or image!");

    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      const resp = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreate(resp.data);
      setCaption("");
      setImage(null);
      setPreview("");
    } catch (err) {
      alert("Error creating post");
      console.error(err);
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="preview" style={{ width: "100%", borderRadius: "10px" }} />}
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
