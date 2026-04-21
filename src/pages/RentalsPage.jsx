import { useNavigate } from 'react-router-dom';
import './PlaceholderPage.css';

export default function RentalsPage() {
  const navigate = useNavigate();
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__content">
        <div className="placeholder-page__icon">🎟️</div>
        <h2 className="placeholder-page__title">My Rentals</h2>
        <p className="placeholder-page__sub">
          Your active rentals will appear here. <br/>
          This page connects to <code>GET /api/rentals</code> (to be built in Milestone 2).
        </p>
        <button className="btn btn--primary" onClick={() => navigate('/browse')}>
          Browse Films
        </button>
      </div>
    </div>
  );
}
