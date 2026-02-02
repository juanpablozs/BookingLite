import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    navigate('/login');
    return null;
  }
  return <>{children}</>;
}
