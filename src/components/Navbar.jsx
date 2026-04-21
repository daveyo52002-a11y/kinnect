import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">▶</span>
          KINNECT
        </Link>

        {user && (
          <nav className="navbar__links">
            <Link to="/browse" className={`navbar__link ${isActive('/browse') ? 'active' : ''}`}>
              Browse
            </Link>
            <Link to="/rentals" className={`navbar__link ${isActive('/rentals') ? 'active' : ''}`}>
              My Rentals
            </Link>
            <Link to="/watch-party" className={`navbar__link ${isActive('/watch-party') ? 'active' : ''}`}>
              Watch Party
            </Link>
            {user.role === 'moderator' && (
              <Link to="/admin" className={`navbar__link navbar__link--admin ${isActive('/admin') ? 'active' : ''}`}>
                Admin
              </Link>
            )}
          </nav>
        )}

        <div className="navbar__right">
          {user ? (
            <div className="navbar__user" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="navbar__avatar">
                {user.name[0].toUpperCase()}
              </div>
              <span className="navbar__username">{user.name}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, opacity: 0.5 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {menuOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <div className="navbar__dropdown-name">{user.name}</div>
                    <div className="navbar__dropdown-email">{user.email}</div>
                    {user.role === 'moderator' && (
                      <span className="navbar__badge">Moderator</span>
                    )}
                  </div>
                  <Link to="/profile" className="navbar__dropdown-item" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="btn btn--ghost">Sign In</Link>
              <Link to="/register" className="btn btn--primary">Join Free</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
