import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { id } = useParams();
  const { user, refresh } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const loadProfile = async () => {
    try {
      const resp = await API.get(`/users/${id}`);
      setProfile(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPosts = async () => {
    try {
      // server has no dedicated user-posts route; filter explore or feed client-side
      const resp = await API.get('/posts/explore?page=1'); // cheap approach
      const userPosts = resp.data.filter(p => p.user._id === id || p.user === id);
      setPosts(userPosts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, [id]);

  const doFollow = async () => {
    try {
      await API.post(`/users/${id}/follow`);
      await loadProfile();
      if (user && user.id === profile._id) refresh();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Follow failed');
    }
  };

  const doUnfollow = async () => {
    try {
      await API.post(`/users/${id}/unfollow`);
      await loadProfile();
      if (user && user.id === profile._id) refresh();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Unfollow failed');
    }
  };

  const onPostUpdate = (updatedPost) => {
    setPosts(prev => prev.map(p => (p._id === updatedPost._id ? updatedPost : p)));
  };

  if (!profile) return <div>Loading...</div>;

  const amIFollowing = profile.followers?.some(f => f._id === (user?.id));

  return (
    <div>
      <div className="profile-header">
        <img src={profile.avatar || 'https://via.placeholder.com/80'} alt="avatar" />
        <div>
          <h3>{profile.username}</h3>
          <p>{profile.name}</p>
          <p>{profile.bio}</p>
          {user && user.id !== profile._id && (
            amIFollowing ? <button onClick={doUnfollow}>Unfollow</button> : <button onClick={doFollow}>Follow</button>
          )}
        </div>
      </div>

      <h4>Posts</h4>
      <div className="posts-list">
        {posts.map(p => <PostCard key={p._id} post={p} onUpdate={onPostUpdate} />)}
      </div>
    </div>
  );
}
