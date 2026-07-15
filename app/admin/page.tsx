"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { signOut } from "next-auth/react";
import styles from "./Admin.module.css";
import {
  Download,
  Package,
  Users,
  ShoppingBag,
  Printer,
  LogOut,
  Loader2,
  RefreshCw,
  IndianRupee,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/format";
import { variantLabel } from "@/lib/constants";

type OrderRow = {
  id: string;
  date: string;
  customer: string;
  customerEmail: string;
  variant: string;
  qty: number;
  amount: number;
  payment: string;
  status: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  checkoutGroupId?: string | null;
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

const SHIPPING_STATUSES = ["PENDING", "SHIPPED", "DELIVERED"] as const;

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
        const res = await fetch("/api/orders?paid=true");
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

  const orderStats = useMemo(() => {
    const paidCount = orders.length;
    const revenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const pendingShipping = orders.filter((o) => o.status === "PENDING").length;
    return { paidCount, revenue, pendingShipping };
  }, [orders]);

  const downloadLabel = (orderId: string) => {
    window.open(`/api/orders/${orderId}`, "_blank");
  };

  const updateShippingStatus = async (orderId: string, shippingStatus: string) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shippingStatus }),
    });
    if (res.ok) fetchData();
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
          <button
            className={`${styles.navBtn} ${activeTab === "orders" ? styles.active : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag size={18} /> Orders
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === "customers" ? styles.active : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            <Users size={18} /> Customers
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === "inventory" ? styles.active : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
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
            <button className={styles.exportBtn} onClick={() => window.open("/api/orders/export", "_blank")}>
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
            <>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>
                    <IndianRupee size={14} aria-hidden /> Paid revenue
                  </span>
                  <strong className={`${styles.statValue} price`}>{formatINR(orderStats.revenue)}</strong>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>
                    <ShoppingBag size={14} aria-hidden /> Paid orders
                  </span>
                  <strong className={styles.statValue}>{orderStats.paidCount}</strong>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>
                    <Clock size={14} aria-hidden /> Pending shipping
                  </span>
                  <strong className={styles.statValue}>{orderStats.pendingShipping}</strong>
                </div>
              </div>

              <div className={styles.card}>
                {orders.length === 0 ? (
                  <p className={styles.emptyState}>
                    No paid orders yet. They appear here after customers complete checkout.
                  </p>
                ) : (
                  <div className={styles.tableScroll}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Shipping</th>
                          <th>Address</th>
                          <th>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <span className={styles.orderId}>{order.id.slice(0, 10)}…</span>
                              <span className={styles.orderMeta}>{order.date}</span>
                            </td>
                            <td>
                              <strong>{order.customer}</strong>
                              <span className={styles.orderMeta}>{order.phone}</span>
                              <span className={styles.orderMeta}>{order.customerEmail}</span>
                            </td>
                            <td>
                              {variantLabel(order.variant)} × {order.qty}
                            </td>
                            <td className={`${styles.amount} price`}>{formatINR(order.amount)}</td>
                            <td>
                              <select
                                className={styles.statusSelect}
                                value={order.status}
                                onChange={(e) => updateShippingStatus(order.id, e.target.value)}
                                aria-label={`Shipping status for ${order.id}`}
                              >
                                {SHIPPING_STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className={styles.addressCell}>
                              {order.addressLine1}
                              {order.addressLine2 ? `, ${order.addressLine2}` : ""}
                              <br />
                              {order.city}, {order.state} — {order.pincode}
                            </td>
                            <td>
                              <button
                                className={styles.actionBtn}
                                onClick={() => downloadLabel(order.id)}
                                title="Download / print shipping label"
                              >
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
            </>
          )}

          {!loading && activeTab === "inventory" && (
            <div className={styles.inventoryGrid}>
              {inventory.map((item) => (
                <div
                  key={item.variant}
                  className={`${styles.inventoryCard} ${item.stock < 20 ? styles.lowStock : ""}`}
                >
                  <div
                    className={styles.variantColor}
                    style={{
                      backgroundColor:
                        item.variant === "Natural" ? "#e8b4a0" : item.variant === "Espresso" ? "#8a9098" : "#ccc",
                    }}
                  />
                  <div>
                    <h3>{variantLabel(item.variant)}</h3>
                    <p className={styles.variantKey}>{item.variant}</p>
                    <p className={`${styles.stockCount} tabular-nums`}>{item.stock} in stock</p>
                    {item.stock < 20 && <span className={styles.alertText}>Low Stock Alert!</span>}
                    <button
                      className={styles.actionBtn}
                      style={{ marginTop: "0.5rem" }}
                      onClick={() => {
                        const val = prompt(
                          `Update stock for ${variantLabel(item.variant)}:`,
                          String(item.stock)
                        );
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
                          <td className="tabular-nums">{c.orderCount}</td>
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
