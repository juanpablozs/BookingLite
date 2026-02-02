import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/layout.css';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">BookingLite</div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="nav-item">Dashboard</a>
          <a href="/services" className="nav-item">Servicios</a>
          <a href="/clients" className="nav-item">Clientes</a>
          <a href="/bookings" className="nav-item">Reservas</a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="main-content">
        <header className="header">BookingLite - Gestión de Reservas</header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
