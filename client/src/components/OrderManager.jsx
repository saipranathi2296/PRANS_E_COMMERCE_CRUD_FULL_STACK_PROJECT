import { useEffect, useState } from "react";
import ApiSection from "./ApiSection";

const defaultForm = {
  user: "",
  items: [{ product: "", quantity: 1 }],
  totalPrice: 0,
  status: "pending",
};

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [ordersRes, usersRes, productsRes] = await Promise.all([
      fetch("/api/orders"),
      fetch("/api/users"),
      fetch("/api/products"),
    ]);
    setOrders(await ordersRes.json());
    setUsers(await usersRes.json());
    setProducts(await productsRes.json());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleItemChange = (index, key, value) => {
    const updated = [...form.items];
    updated[index][key] = key === "quantity" ? Number(value) : value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { product: "", quantity: 1 }] });
  };

  const removeItem = (index) => {
    setForm({ ...form, items: form.items.filter((_, idx) => idx !== index) });
  };

  const calculatePrice = () => {
    return form.items.reduce((sum, item) => {
      const product = products.find((p) => p._id === item.product);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSave = async () => {
    const payload = { ...form, totalPrice: calculatePrice() };
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/orders/${editId}` : "/api/orders";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setForm(defaultForm);
    setEditId(null);
    loadData();
  };

  const handleEdit = (order) => {
    setForm({
      user: order.user._id,
      items: order.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
    });
    setEditId(order._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <ApiSection title="Orders" loading={loading}>
      <div className="grid">
        <div className="card">
          <h3>{editId ? "Edit Order" : "Create Order"}</h3>
          <div className="input-row">
            <select
              className="select-field"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <select
              className="select-field"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {form.items.map((item, index) => (
            <div
              key={index}
              className="input-row"
              style={{ alignItems: "center" }}
            >
              <select
                className="select-field"
                value={item.product}
                onChange={(e) =>
                  handleItemChange(index, "product", e.target.value)
                }
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                className="input-field"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
              <button
                className="button secondary"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="actions">
            <button className="button secondary" onClick={addItem}>
              Add Item
            </button>
            <button className="button primary" onClick={handleSave}>
              {editId ? "Update Order" : "Create Order"}
            </button>
          </div>

          <p style={{ marginTop: 16, color: "#cbd5e1" }}>
            Calculated total: <strong>${calculatePrice().toFixed(2)}</strong>
          </p>
        </div>

        <div className="card">
          <h3>All Orders</h3>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user.name}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className="status-badge">{order.status}</span>
                  </td>
                  <td>{order.items.length}</td>
                  <td>
                    <button
                      className="button secondary"
                      onClick={() => handleEdit(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => handleDelete(order._id)}
                    >
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

export default OrderManager;
