'use client';
import React from 'react';

export default function LoyaltyManagerPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Loyalty Manager</h1>
      <p>Manage loyalty programs and customer rewards here.</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Add New Loyalty Program
      </button>
    </div>
  );
}
