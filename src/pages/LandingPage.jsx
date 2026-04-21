import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOVIES } from '../data/mockMovies';
import './LandingPage.css';

export default function LandingPage() {
  const { user } = useAuth();
  const featured = MOVIES.slice(0, 5);

  return (
    <div className="landing">

      {/* ── Hero ── */}
      <section className="landing__hero">
        <div className="landing__hero-bg">
          {featured.map((m, i) => (
            <div
              key={m.id}
              className="landing__hero-shard"
              style={{
                '--shard-bg': m.poster_color,
                '--shard-accent': m.accent,
                '--i': i,
              }}
            />
          ))}
          <div className="landing__hero-veil" />
        </div>

        <div className="landing__hero-content">
          <div className="landing__eyebrow">
            <span className="landing__eyebrow-dot" />
            Rent · Watch · Connect
          </div>
          <h1 className="landing__headline">
            Cinema lives<br />
            <em>together.</em>
          </h1>
          <p className="landing__tagline">
            Browse thousands of films, rent in seconds, and host
            synchronized Watch Parties with friends — all in one place.
          </p>
          <div className="landing__ctas">
            {user ? (
              <Link to="/browse" className="landing__cta landing__cta--primary">
                Browse Films →
              </Link>
            ) : (
              <>
                <Link to="/register" className="landing__cta landing__cta--primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="landing__cta landing__cta--ghost">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Floating poster strip */}
        <div className="landing__poster-strip">
          {featured.map((m) => (
            <Link
              key={m.id}
              to={`/movie/${m.id}`}
              className="landing__poster-chip"
              style={{ '--poster-bg': m.poster_color, '--poster-accent': m.accent }}
            >
              <div className="landing__poster-chip-bg" />
              <div className="landing__poster-chip-title">{m.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing__features">
        <div className="landing__features-inner">
          <h2 className="landing__section-title">Everything you need<br />in one reel.</h2>

          <div className="landing__features-grid">
            <FeatureCard
              icon="🎞️"
              title="Vast Catalog"
              desc="Thousands of films across every genre, updated regularly by our moderation team."
            />
            <FeatureCard
              icon="⚡"
              title="Instant Rental"
              desc="Rent any available title in one click. Your 7-day window starts the moment you confirm."
            />
            <FeatureCard
              icon="🎉"
              title="Watch Parties"
              desc="Host synchronized viewing sessions with live-sync playback and real-time group chat."
            />
            <FeatureCard
              icon="🤖"
              title="Smart Picks"
              desc="Our recommendation engine learns your taste and surfaces titles you'll actually want to watch."
            />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="landing__banner">
        <div className="landing__banner-inner">
          <h2 className="landing__banner-title">Ready to watch?</h2>
          <p className="landing__banner-sub">Join Kinnect today — it's free to browse.</p>
          {!user && (
            <Link to="/register" className="landing__cta landing__cta--primary">
              Create Account
            </Link>
          )}
          {user && (
            <Link to="/browse" className="landing__cta landing__cta--primary">
              Go to Catalog →
            </Link>
          )}
        </div>
      </section>

      <footer className="landing__footer">
        <span className="landing__footer-logo">▶ KINNECT</span>
        <span className="landing__footer-copy">© {new Date().getFullYear()} Kinnect. Built with React + Node.js</span>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-card__icon">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{desc}</p>
    </div>
  );
}
