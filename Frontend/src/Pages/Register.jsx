import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await API.post('/auth/register', { name, username, email, password });
      login(resp.data);
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
