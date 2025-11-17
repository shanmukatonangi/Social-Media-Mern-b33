import React, { useState } from "react";
import API from "../api";

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query.trim()) return;
    const res = await API.get(`/users/search?query=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <h2>Search Friends</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username..."
      />
      <button onClick={search}>Search</button>

      <ul>
        {results.map((u) => (
          <li key={u._id}>
            {u.username} — 
            <button onClick={() => API.post(`/users/${u._id}/follow`)}>Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
