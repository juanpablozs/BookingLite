import React, { useState, useEffect } from 'react';
import client from '../services/api';
import '../styles/dashboard.css';

interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

  const fetchClients = async (q = '') => {
    try {
      const res = await client.get('/clients', { params: { q } });
      setClients(res.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(query);
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/clients', formData);
      setFormData({ name: '', email: '', phone: '', notes: '' });
      setShowForm(false);
      fetchClients(query);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error creating client');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Confirm delete?')) {
      try {
        await client.delete(`/clients/${id}`);
        fetchClients(query);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="dashboard">
      <h1>Clientes</h1>
      {error && <div className="error-msg">{error}</div>}
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search by name/email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-edit" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Client'}
        </button>
      </div>
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
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-submit">Create</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email || '-'}</td>
              <td>{c.phone || '-'}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
