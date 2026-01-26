import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>BookingLite</h1>
    <nav>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </nav>
  </div>
);

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<div>Login (to implement)</div>} />
        <Route path="/register" element={<div>Register (to implement)</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}
