import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/browse');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background film strip decoration */}
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
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">Sign in to your account to continue watching</p>
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

          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="password">
              Password
              <Link to="/forgot-password" className="auth-form__forgot">Forgot?</Link>
            </label>
            <input
              id="password"
              className="auth-form__input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="auth-form__submit"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-form__spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="auth-card__switch">
          Don't have an account?{' '}
          <Link to="/register" className="auth-card__switch-link">Create one</Link>
        </p>

        {/* Demo hint */}
        <div className="auth-card__demo">
          <span>Demo: any email + 6-char password</span>
          <span>Use "admin@..." for moderator access</span>
        </div>
      </div>
    </div>
  );
}
