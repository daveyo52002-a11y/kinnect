import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage      from './pages/LandingPage';
import LoginPage        from './pages/LoginPage';
import RegisterPage     from './pages/RegisterPage';
import BrowsePage       from './pages/BrowsePage';
import MovieDetailPage  from './pages/MovieDetailPage';
import RentalsPage      from './pages/RentalsPage';
import { WatchPartyPage, AdminPage } from './pages/OtherPages';

import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/browse"   element={<BrowsePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />

          {/* Protected — any logged-in user */}
          <Route path="/rentals" element={
            <ProtectedRoute><RentalsPage /></ProtectedRoute>
          } />
          <Route path="/watch-party" element={
            <ProtectedRoute><WatchPartyPage /></ProtectedRoute>
          } />

          {/* Protected — moderator only */}
          <Route path="/admin" element={
            <ProtectedRoute requireRole="moderator"><AdminPage /></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
