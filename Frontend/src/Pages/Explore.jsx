import React, { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";

export default function Explore() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await API.get("/posts/explore");
      setPosts(res.data);
    })();
  }, []);

  return (
    <div>
      <h2>Explore</h2>
      <div className="posts-list">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} onUpdate={() => {}} />
        ))}
      </div>
    </div>
  );
}
