import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = React.useContext(AuthContext);
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">InstaMERN</Link>
      </div>

      {user && (
        <div className="nav-center">
          {/* ✅ New: Add Search link */}
          <Link to="/search" className="nav-link">Search</Link>
        </div>
      )}

      <div className="nav-right">
        {user ? (
          <>
            <Link to="/">Feed</Link>
            <Link to="/explore">Explore</Link>
            <Link to={`/profile/${user.id}`}>Profile</Link>
            <button onClick={doLogout} className="btn-tiny">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
