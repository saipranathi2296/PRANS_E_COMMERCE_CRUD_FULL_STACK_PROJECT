function HomePage() {
  return (
    <section className="panel">
      <h2>Welcome to the Fullstack Admin Panel</h2>
      <p>
        Use this interface to manage users, products, and orders for your
        application. The panel is built with React and connects to the backend
        API through the `/api` proxy.
      </p>
      <div className="grid">
        <div className="card">
          <h3>Fast Management</h3>
          <p>
            Quickly view and manage all core data models from a single
            dashboard.
          </p>
        </div>
        <div className="card">
          <h3>Responsive UI</h3>
          <p>The frontend is optimized for admin workflows and easy editing.</p>
        </div>
        <div className="card">
          <h3>API Connected</h3>
          <p>
            The client automatically consumes Users, Products, and Orders APIs.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
