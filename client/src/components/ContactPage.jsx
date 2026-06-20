function ContactPage() {
  return (
    <section className="panel">
      <h2>Contact</h2>
      <p>
        Need help or want to extend this application? Reach out using the
        details below.
      </p>
      <div className="grid">
        <div className="card">
          <h3>Support</h3>
          <p>Email: support@example.com</p>
        </div>
        <div className="card">
          <h3>Sales</h3>
          <p>Email: sales@example.com</p>
        </div>
        <div className="card">
          <h3>Office</h3>
          <p>123 Fullstack Boulevard, Dev City</p>
        </div>
      </div>
      <div className="actions" style={{ marginTop: 24 }}>
        <button className="button primary">Request a Demo</button>
        <button className="button secondary">Report an Issue</button>
      </div>
    </section>
  );
}

export default ContactPage;
