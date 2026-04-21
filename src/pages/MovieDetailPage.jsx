import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovie } from '../data/mockMovies';
import { useAuth } from '../context/AuthContext';
import './MovieDetailPage.css';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renting, setRenting] = useState(false);
  const [rented, setRented] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovie(id)
      .then((m) => { setMovie(m); setLoading(false); })
      .catch(() => { setError('Movie not found.'); setLoading(false); });
  }, [id]);

  const handleRent = async () => {
    if (!user) { navigate('/login'); return; }
    setRenting(true);
    // TODO: POST /api/rentals { movie_id: movie.id }
    await new Promise((r) => setTimeout(r, 1000));
    setRenting(false);
    setRented(true);
  };

  if (loading) return (
    <div className="detail-loading">
      <div className="detail-loading__spinner" />
    </div>
  );

  if (error || !movie) return (
    <div className="detail-error">
      <h2>404</h2>
      <p>{error || 'Movie not found'}</p>
      <button className="btn btn--ghost" onClick={() => navigate('/browse')}>← Back to catalog</button>
    </div>
  );

  return (
    <div className="detail-page" style={{ '--poster-bg': movie.poster_color, '--poster-accent': movie.accent }}>
      {/* Backdrop */}
      <div className="detail-backdrop">
        <div className="detail-backdrop__gradient" />
      </div>

      <div className="detail-content">
        {/* Back */}
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="detail-layout">
          {/* Poster */}
          <div className="detail-poster">
            <div className="detail-poster__bg" />
            <div className="detail-poster__title">{movie.title}</div>
            <div className="detail-poster__year">{movie.year}</div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-info__genre-row">
              <span className="detail-info__genre">{movie.genre}</span>
              <span className="detail-info__dot">·</span>
              <span className="detail-info__year">{movie.year}</span>
              <span className="detail-info__dot">·</span>
              <span className="detail-info__duration">{movie.duration}</span>
            </div>

            <h1 className="detail-info__title">{movie.title}</h1>

            <div className="detail-info__rating">
              <span className="detail-info__star">★</span>
              <span className="detail-info__score">{movie.rating.toFixed(1)}</span>
              <span className="detail-info__out">/10</span>
            </div>

            <p className="detail-info__director">
              Directed by <strong>{movie.director}</strong>
            </p>

            <p className="detail-info__desc">{movie.description}</p>

            {/* Stock */}
            <div className={`detail-info__stock ${movie.stock_count === 0 ? 'out' : ''}`}>
              {movie.stock_count === 0
                ? '✕ Currently unavailable'
                : `✓ ${movie.stock_count} cop${movie.stock_count === 1 ? 'y' : 'ies'} available`
              }
            </div>

            {/* Actions */}
            <div className="detail-actions">
              {rented ? (
                <div className="detail-rented">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Rented! Returns in 7 days
                </div>
              ) : (
                <button
                  className="detail-rent-btn"
                  disabled={movie.stock_count === 0 || renting}
                  onClick={handleRent}
                >
                  {renting ? (
                    <span className="auth-form__spinner" style={{ borderTopColor: '#0a0800' }} />
                  ) : movie.stock_count === 0 ? (
                    'Unavailable'
                  ) : (
                    '▶ Rent Now'
                  )}
                </button>
              )}

              <button
                className="detail-party-btn"
                onClick={() => navigate('/watch-party')}
                disabled={movie.stock_count === 0}
              >
                Watch Party
              </button>
            </div>

            <p className="detail-rental-note">
              Rentals last 7 days · Stream unlimited times during your rental period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
