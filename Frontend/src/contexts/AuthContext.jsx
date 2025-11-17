import React, { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // refresh profile from server (useful after follow/unfollow)
  const refresh = async () => {
    try {
      if (!user) return;
      const resp = await API.get(`/users/${user.id}`);
      // server returns full user doc; map to minimal shape
      const u = {
        id: resp.data._id,
        name: resp.data.name,
        username: resp.data.username,
        avatar: resp.data.avatar
      };
      localStorage.setItem('user', JSON.stringify(u));
      setUser(u);
    } catch (err) {
      console.error('refresh error', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
