import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchMovies, GENRES } from '../data/mockMovies';
import './BrowsePage.css';

export default function BrowsePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchMovies({ genre: activeGenre || null, search })
        .then((data) => {
          const sorted = [...data].sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'year')   return b.year - a.year;
            if (sortBy === 'title')  return a.title.localeCompare(b.title);
            return 0;
          });
          setMovies(sorted);
          setLoading(false);
        });
    }, 200); // debounce
    return () => clearTimeout(timer);
  }, [search, activeGenre, sortBy]);

  return (
    <div className="browse-page">
      {/* Hero strip */}
      <div className="browse-hero">
        <div className="browse-hero__inner">
          <h1 className="browse-hero__title">Film Catalog</h1>
          <p className="browse-hero__sub">
            Browse, rent, and watch with friends — {movies.length} titles available
          </p>
        </div>
      </div>

      <div className="browse-content">
        {/* Controls */}
        <div className="browse-controls">
          {/* Search */}
          <div className="browse-search">
            <svg className="browse-search__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              className="browse-search__input"
              type="text"
              placeholder="Search titles, directors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="browse-search__clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Sort */}
          <select
            className="browse-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Top Rated</option>
            <option value="year">Newest</option>
            <option value="title">A–Z</option>
          </select>
        </div>

        {/* Genre filters */}
        <div className="browse-genres">
          <button
            className={`browse-genre-btn ${activeGenre === '' ? 'active' : ''}`}
            onClick={() => setActiveGenre('')}
          >
            All
          </button>
          {GENRES.map((g) => (
            <button
              key={g.id}
              className={`browse-genre-btn ${activeGenre === g.name ? 'active' : ''}`}
              onClick={() => setActiveGenre(activeGenre === g.name ? '' : g.name)}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="browse-loading">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="browse-skeleton">
                <div className="browse-skeleton__poster" />
                <div className="browse-skeleton__line browse-skeleton__line--title" />
                <div className="browse-skeleton__line browse-skeleton__line--meta" />
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="browse-empty">
            <div className="browse-empty__icon">🎬</div>
            <h3>No films found</h3>
            <p>Try a different search or genre</p>
            <button className="btn btn--ghost" onClick={() => { setSearch(''); setActiveGenre(''); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="browse-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
