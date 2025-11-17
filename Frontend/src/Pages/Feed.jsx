import React, { useEffect, useState } from 'react';
import API from '../api';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const load = async () => {
    try {
      const resp = await API.get('/posts/feed');
      setPosts(resp.data);
    } catch (err) {
      console.error(err);
      alert('Could not load feed');
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = (newPost) => {
    // add to top
    setPosts(prev => [newPost, ...prev]);
  };

  const onPostUpdate = (updatedPost) => {
    setPosts(prev => prev.map(p => (p._id === updatedPost._id ? updatedPost : p)));
  };

  return (
    <div>
      <h2>Feed</h2>
      <CreatePost onCreate={onCreate} />
      <div className="posts-list">
        {posts.map(post => (
          <PostCard key={post._id} post={post} onUpdate={onPostUpdate} />
        ))}
      </div>
    </div>
  );
}
