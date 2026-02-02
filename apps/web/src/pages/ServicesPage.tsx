import React, { useState, useEffect } from 'react';
import client from '../services/api';
import '../styles/dashboard.css';

interface Service {
  id: number;
  name: string;
  description?: string;
  durationMinutes: number;
  price?: number;
  isActive: boolean;
}

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', durationMinutes: 30, price: 0, isActive: true });
  const [page, setPage] = useState(1);

  const fetchServices = async (p = 1) => {
    try {
      const res = await client.get('/services', { params: { page: p, limit: 20 } });
      setServices(res.data.data);
      setPage(p);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/services', formData);
      setFormData({ name: '', description: '', durationMinutes: 30, price: 0, isActive: true });
      setShowForm(false);
      fetchServices();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error creating service');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Confirm delete?')) {
      try {
        await client.delete(`/services/${id}`);
        fetchServices();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="dashboard">
      <h1>Servicios</h1>
      {error && <div className="error-msg">{error}</div>}
      <button className="btn-edit" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Service'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '4px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Duration (min)</label>
            <input
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <button type="submit" className="btn-submit">Create</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.durationMinutes} min</td>
              <td>${s.price?.toFixed(2) || 0}</td>
              <td>{s.isActive ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
