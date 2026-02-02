import React from 'react';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/dashboard" style={{ color: '#667eea' }}>
        Back to Dashboard
      </a>
    </div>
  );
}
