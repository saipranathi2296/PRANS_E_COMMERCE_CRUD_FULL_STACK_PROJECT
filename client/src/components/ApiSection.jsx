import { useState } from 'react';

function ApiSection({ title, children, loading }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
      {loading && <div style={{ marginTop: 16, color: '#93c5fd' }}>Loading...</div>}
    </section>
  );
}

export default ApiSection;
