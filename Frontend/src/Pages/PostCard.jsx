import React, { useState } from "react";
import API from "../api";

export default function PostCard({ post, onUpdate }) {
  const [comment, setComment] = useState("");

  const toggleLike = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/like`);
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const res = await API.post(`/posts/${post._id}/comment`, { text: comment });
      onUpdate(res.data);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <h4>{post.user?.username}</h4>
      <p>{post.caption}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width: "100%", borderRadius: "10px" }} />}
      <div>
        <button onClick={toggleLike}>
          ❤️ {post.likes?.length || 0}
        </button>
      </div>
      <form onSubmit={submitComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
      </form>
      <div className="comments">
        {post.comments?.map((c, i) => (
          <p key={i}>
            <b>{c.user?.username || "Anon"}:</b> {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
