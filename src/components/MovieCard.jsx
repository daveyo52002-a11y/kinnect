import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <article
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{ '--poster-bg': movie.poster_color, '--poster-accent': movie.accent }}
    >
      {/* Poster */}
      <div className="movie-card__poster">
        <div className="movie-card__poster-bg" />
        <div className="movie-card__poster-title">{movie.title}</div>
        <div className="movie-card__poster-year">{movie.year}</div>

        {/* Availability badge */}
        <div className={`movie-card__stock ${movie.stock_count === 0 ? 'out' : ''}`}>
          {movie.stock_count === 0 ? 'Unavailable' : `${movie.stock_count} left`}
        </div>

        {/* Hover overlay */}
        <div className="movie-card__overlay">
          <p className="movie-card__desc">{movie.description}</p>
          <button
            className="movie-card__rent-btn"
            disabled={movie.stock_count === 0}
            onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
          >
            {movie.stock_count === 0 ? 'Unavailable' : 'View & Rent'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__genre">{movie.genre}</span>
          <span className="movie-card__dot">·</span>
          <span>{movie.duration}</span>
        </div>
        <div className="movie-card__rating">
          <span className="movie-card__star">★</span>
          {movie.rating.toFixed(1)}
        </div>
      </div>
    </article>
  );
}
