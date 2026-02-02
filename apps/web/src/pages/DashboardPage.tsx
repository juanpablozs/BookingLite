import React, { useState, useEffect } from 'react';
import client from '../services/api';
import '../styles/dashboard.css';

interface Stat {
  total: number;
  bookingsToday: number;
  estimatedRevenue: number;
  byStatus: Array<{ status: string; count: number }>;
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await client.get('/stats/dashboard');
        setStats(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!stats) return <div>No data</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Reservas</h3>
          <p className="metric-value">{stats.total}</p>
        </div>
        <div className="metric-card">
          <h3>Reservas Hoy</h3>
          <p className="metric-value">{stats.bookingsToday}</p>
        </div>
        <div className="metric-card">
          <h3>Ingresos Estimados</h3>
          <p className="metric-value">${stats.estimatedRevenue.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>Estados</h3>
          {stats.byStatus.map((s) => (
            <p key={s.status}>
              {s.status}: <strong>{s.count}</strong>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
