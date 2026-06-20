import { useEffect, useState } from 'react';
import ApiSection from './ApiSection';

const defaultForm = { name: '', description: '', price: '', stock: '' };

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async () => {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/products/${editId}` : '/api/products';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });
    setForm(defaultForm);
    setEditId(null);
    loadProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadProducts();
  };

  return (
    <ApiSection title="Products" loading={loading}>
      <div className="grid">
        <div className="card">
          <h3>{editId ? 'Edit Product' : 'Create Product'}</h3>
          <div className="input-row">
            <input
              className="input-field"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div className="actions">
            <button className="button primary" onClick={handleSave}>
              {editId ? 'Update Product' : 'Add Product'}
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
          <h3>All Products</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button className="button secondary" onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button className="button secondary" onClick={() => handleDelete(product._id)}>
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

export default ProductManager;
