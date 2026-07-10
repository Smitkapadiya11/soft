"use client";

import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import styles from "./Admin.module.css";
import { Download, Package, Users, ShoppingBag, Printer, LogOut, Loader2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

type OrderRow = {
  id: string;
  date: string;
  customer: string;
  variant: string;
  qty: number;
  amount: number;
  payment: string;
  status: string;
  address: string;
  pincode: string;
};

type InventoryRow = {
  id: string;
  variant: string;
  stock: number;
};

type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orderCount: number;
  createdAt: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [inventory, setInventory] = useState<InventoryRow[]>([]);
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "orders") {
        const res = await fetch("/api/orders");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data.orders);
      } else if (activeTab === "inventory") {
        const res = await fetch("/api/inventory");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load inventory");
        const data = await res.json();
        setInventory(data.inventory);
      } else if (activeTab === "customers") {
        const res = await fetch("/api/customers");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load customers");
        const data = await res.json();
        setCustomers(data.customers);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [activeTab, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateCSV = () => {
    window.open("/api/orders/export", "_blank");
  };

  const printLabel = (order: OrderRow) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Shipping Label - ${order.id}</title></head>
          <body style="font-family: sans-serif; padding: 2rem;">
            <h2>SHIP TO:</h2>
            <p><strong>${order.customer}</strong></p>
            <p>${order.address}</p>
            <p>Pincode: ${order.pincode}</p>
            <hr style="margin: 2rem 0;" />
            <p style="font-size: 0.8rem; color: #666;">Note: Discreet Packaging. Do not mention product details.</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const updateStock = async (variant: string, stockCount: number) => {
    const res = await fetch("/api/inventory", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant, stockCount }),
    });
    if (res.ok) fetchData();
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.brand}>Silk Room Admin</h2>
        <nav className={styles.nav}>
          <button className={`${styles.navBtn} ${activeTab === "orders" ? styles.active : ""}`} onClick={() => setActiveTab("orders")}>
            <ShoppingBag size={18} /> Orders
          </button>
          <button className={`${styles.navBtn} ${activeTab === "customers" ? styles.active : ""}`} onClick={() => setActiveTab("customers")}>
            <Users size={18} /> Customers
          </button>
          <button className={`${styles.navBtn} ${activeTab === "inventory" ? styles.active : ""}`} onClick={() => setActiveTab("inventory")}>
            <Package size={18} /> Inventory
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={() => signOut({ callbackUrl: "/admin/login" })}>
          <LogOut size={16} style={{ display: "inline", marginRight: 6 }} />
          Sign Out
        </button>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Dashboard</h1>
          {activeTab === "orders" && (
            <button className={styles.exportBtn} onClick={generateCSV}>
              <Download size={16} aria-hidden /> Export CSV
            </button>
          )}
          <button className={styles.exportBtn} onClick={fetchData} aria-label="Refresh data">
            <RefreshCw size={16} aria-hidden />
          </button>
        </div>

        <div className={styles.content}>
          {loading && (
            <p className={styles.loadingText} aria-live="polite">
              <Loader2 size={18} className={styles.spinner} aria-hidden /> Loading…
            </p>
          )}
          {error && <p className={styles.loginError}>{error}</p>}

          {!loading && activeTab === "orders" && (
            <div className={styles.card}>
              {orders.length === 0 ? (
                <p className={styles.emptyState}>No orders yet. They will appear here after customers complete checkout.</p>
              ) : (
                <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Variant</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id.slice(0, 12)}...</td>
                        <td>{order.date}</td>
                        <td>{order.customer}</td>
                        <td>{order.variant}</td>
                        <td>{order.qty}</td>
                        <td>₹{order.amount}</td>
                        <td>
                          <span className={`${styles.badge} ${order.payment === "PAID" ? styles.shipped : styles.pending}`}>
                            {order.payment}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.badge} ${styles[order.status.toLowerCase()]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className={styles.actionBtn} onClick={() => printLabel(order)} title="Print Shipping Label">
                            <Printer size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === "inventory" && (
            <div className={styles.inventoryGrid}>
              {inventory.map((item) => (
                <div key={item.variant} className={`${styles.inventoryCard} ${item.stock < 20 ? styles.lowStock : ""}`}>
                  <div className={styles.variantColor} style={{ backgroundColor: item.variant === "Ultra Thin" ? "#f4e9e4" : item.variant === "Dotted" ? "#4a2c3a" : "#ccc" }} />
                  <div>
                    <h3>{item.variant}</h3>
                    <p className={styles.stockCount}>{item.stock} in stock</p>
                    {item.stock < 20 && <span className={styles.alertText}>Low Stock Alert!</span>}
                    <button
                      className={styles.actionBtn}
                      style={{ marginTop: "0.5rem" }}
                      onClick={() => {
                        const val = prompt(`Update stock for ${item.variant}:`, String(item.stock));
                        if (val !== null) updateStock(item.variant, parseInt(val, 10));
                      }}
                    >
                      Update Stock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && activeTab === "customers" && (
            <div className={styles.card}>
              {customers.length === 0 ? (
                <p className={styles.emptyState}>No customers yet.</p>
              ) : (
                <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>Orders</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{c.city}</td>
                        <td>{c.orderCount}</td>
                        <td>{c.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
