import React, { useState, useEffect } from 'react';
import client from '../services/api';
import '../styles/dashboard.css';

interface Booking {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  service?: { name: string };
  client?: { name: string };
}

export function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ serviceId: '', clientId: '', date: '', startTime: '' });
  const [services, setServices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const res = await client.get('/bookings');
      setBookings(res.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await client.get('/services');
      setServices(res.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await client.get('/clients');
      setClients(res.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, serviceId: Number(formData.serviceId), clientId: Number(formData.clientId) };
      await client.post('/bookings', payload);
      setFormData({ serviceId: '', clientId: '', date: '', startTime: '' });
      setShowForm(false);
      fetchBookings();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error creating booking');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await client.patch(`/bookings/${id}`, { status });
      fetchBookings();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Confirm delete?')) {
      try {
        await client.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="dashboard">
      <h1>Reservas</h1>
      {error && <div className="error-msg">{error}</div>}
      <button className="btn-edit" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'New Booking'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '4px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Service</label>
            <select
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              required
            >
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Client</label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              required
            >
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Create</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Client</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.service?.name || '-'}</td>
              <td>{b.client?.name || '-'}</td>
              <td>{b.date}</td>
              <td>
                {b.startTime} - {b.endTime}
              </td>
              <td>
                <select value={b.status} onChange={(e) => handleStatusChange(b.id, e.target.value)}>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
