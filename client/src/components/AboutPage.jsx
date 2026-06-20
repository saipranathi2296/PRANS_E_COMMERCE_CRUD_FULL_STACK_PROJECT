function AboutPage() {
  return (
    <section className="panel">
      <h2>About This App</h2>
      <p>
        This fullstack application demonstrates a simple admin panel built with
        React on the frontend and Express/MongoDB on the backend.
      </p>
      <div className="grid">
        <div className="card">
          <h3>Frontend</h3>
          <p>React + Vite + Tailwind-style layout for fast development.</p>
        </div>
        <div className="card">
          <h3>Backend</h3>
          <p>
            Node.js + Express with CRUD APIs for Users, Products, and Orders.
          </p>
        </div>
        <div className="card">
          <h3>Database</h3>
          <p>MongoDB stores all entities and enables fast lookups.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
