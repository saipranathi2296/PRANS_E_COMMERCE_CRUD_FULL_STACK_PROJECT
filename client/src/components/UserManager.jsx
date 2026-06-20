import { useEffect, useState } from 'react';
import ApiSection from './ApiSection';

const defaultForm = { name: '', email: '', password: '' };

function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = async () => {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/users/${editId}` : '/api/users';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm(defaultForm);
    setEditId(null);
    loadUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: user.password });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    loadUsers();
  };

  return (
    <ApiSection title="Users" loading={loading}>
      <div className="grid">
        <div className="card">
          <h3>{editId ? 'Edit User' : 'Create User'}</h3>
          <div className="input-row">
            <input
              className="input-field"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="actions">
            <button className="button primary" onClick={handleSave}>
              {editId ? 'Update User' : 'Add User'}
            </button>
            {editId && (
              <button
                className="button secondary"
                onClick={() => {
                  setForm(defaultForm);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <h3>All Users</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="button secondary" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="button secondary" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ApiSection>
  );
}

export default UserManager;
