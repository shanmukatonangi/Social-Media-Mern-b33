import React, { useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function PostCard({ post, onUpdate }) {
  const [comment, setComment] = useState('');
  const liked = post.likes && post.likes.includes(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');

  const toggleLike = async () => {
    try {
      await API.post(`/posts/${post._id}/like`);
      // optimistic update — fetch updated post from server
      const resp = await API.get(`/posts/${post._id}`);
      if (onUpdate) onUpdate(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    try {
      await API.post(`/posts/${post._id}/comment`, { text: comment });
      const resp = await API.get(`/posts/${post._id}`);
      setComment('');
      if (onUpdate) onUpdate(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`/profile/${post.user._id || post.user}`}>{post.user.username || post.user}</Link>
      </div>
      {post.image && <img src={post.image} alt="post" className="post-image" />}
      <div className="post-body">
        <div className="post-actions">
          <button onClick={toggleLike} className="btn-tiny">{post.likes?.length || 0} ❤️</button>
        </div>
        <div className="caption"><strong>{post.user.username}</strong> {post.caption}</div>
        <div className="comments">
          {post.comments?.map((c) => (
            <div key={c._id} className="comment-line">
              <strong>{c.user?.username || 'user'}</strong> {c.text}
            </div>
          ))}
        </div>
        <form onSubmit={submitComment} className="comment-form">
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}
