import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await API.post('/auth/login', { emailOrUsername, password });
      login(resp.data);
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)} placeholder="Email or Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
