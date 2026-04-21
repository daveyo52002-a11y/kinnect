import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/browse');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <div className="auth-page__strip" />
        <div className="auth-page__strip auth-page__strip--2" />
      </div>

      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-card__brand-icon">▶</span>
          <span className="auth-card__brand-name">KINNECT</span>
        </div>

        <div className="auth-card__header">
          <h1 className="auth-card__title">Create account</h1>
          <p className="auth-card__subtitle">Join Kinnect and start watching together</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="auth-form__error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="name">Name</label>
            <input
              id="name"
              className="auth-form__input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="email">Email</label>
            <input
              id="email"
              className="auth-form__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-form__row">
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="password">Password</label>
              <input
                id="password"
                className="auth-form__input"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="confirm">Confirm</label>
              <input
                id="confirm"
                className="auth-form__input"
                type="password"
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button className="auth-form__submit" type="submit" disabled={loading}>
            {loading ? <span className="auth-form__spinner" /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-card__switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-card__switch-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
