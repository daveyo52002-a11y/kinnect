import { useNavigate } from 'react-router-dom';
import './PlaceholderPage.css';

export function WatchPartyPage() {
  const navigate = useNavigate();
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__content">
        <div className="placeholder-page__icon">🎬</div>
        <h2 className="placeholder-page__title">Watch Party</h2>
        <p className="placeholder-page__sub">
          Synchronized viewing with live chat — coming in Milestone 2. <br/>
          Uses <code>POST /api/parties</code> and WebSocket for live sync.
        </p>
        <button className="btn btn--primary" onClick={() => navigate('/browse')}>
          Browse Films
        </button>
      </div>
    </div>
  );
}

export function AdminPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__content">
        <div className="placeholder-page__icon">🛠️</div>
        <h2 className="placeholder-page__title">Admin Panel</h2>
        <p className="placeholder-page__sub">
          Moderator tools for managing the catalog — coming in Milestone 1 backend. <br/>
          Connects to <code>POST /api/movies</code>, <code>PUT /api/movies/:id</code>, <code>DELETE /api/movies/:id</code>.
        </p>
      </div>
    </div>
  );
}
