import { useState } from "react";
import UserManager from "./components/UserManager";
import ProductManager from "./components/ProductManager";
import OrderManager from "./components/OrderManager";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

const pageLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const adminTabs = [
  { id: "users", label: "Users" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
];

function App() {
  const [activePage, setActivePage] = useState("home");
  const [activeAdminTab, setActiveAdminTab] = useState("users");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Fullstack Admin Panel</h1>
          <p>Manage users, products, and orders with a single dashboard.</p>
        </div>
        <nav className="top-nav flex flex-wrap gap-3">
          {pageLinks.map((link) => (
            <button
              key={link.id}
              className={activePage === link.id ? "tab active" : "tab"}
              onClick={() => setActivePage(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </header>

      {activePage === "home" && (
        <nav className="tab-bar">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              className={activeAdminTab === tab.id ? "tab active" : "tab"}
              onClick={() => setActiveAdminTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      <main className="main-content">
        {activePage === "home" && activeAdminTab === "users" && <UserManager />}
        {activePage === "home" && activeAdminTab === "products" && (
          <ProductManager />
        )}
        {activePage === "home" && activeAdminTab === "orders" && (
          <OrderManager />
        )}
        {activePage === "about" && <AboutPage />}
        {activePage === "contact" && <ContactPage />}
      </main>
    </div>
  );
}

export default App;
