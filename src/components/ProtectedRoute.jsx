import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireRole }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, preserve intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/browse" replace />;
  }

  return children;
}
