"use client";

import { useState } from "react";
import styles from "./Admin.module.css";
import { Download, Package, Users, ShoppingBag, Printer } from "lucide-react";

// Mock Data
const MOCK_ORDERS = [
  { id: "ORD-1001", date: "2026-07-05", customer: "Aditi S.", variant: "Blush", qty: 1, amount: 4999, payment: "PAID", status: "PENDING", address: "123 Main St", pincode: "400001" },
  { id: "ORD-1002", date: "2026-07-05", customer: "Rohan K.", variant: "Plum", qty: 2, amount: 9998, payment: "PAID", status: "SHIPPED", address: "45 Park Ave", pincode: "110001" },
];

const MOCK_INVENTORY = [
  { variant: "Blush", stock: 145 },
  { variant: "Plum", stock: 12 }, // Low stock
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  const generateCSV = () => {
    const headers = "Order ID,Date,Customer,Variant,Qty,Amount,Payment,Status\n";
    const rows = MOCK_ORDERS.map(o => `${o.id},${o.date},${o.customer},${o.variant},${o.qty},${o.amount},${o.payment},${o.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
  };

  const printLabel = (order: typeof MOCK_ORDERS[0]) => {
    const printWindow = window.open('', '_blank');
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

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.brand}>Silk Room Admin</h2>
        <nav className={styles.nav}>
          <button className={`${styles.navBtn} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingBag size={18} /> Orders
          </button>
          <button className={`${styles.navBtn} ${activeTab === 'customers' ? styles.active : ''}`} onClick={() => setActiveTab('customers')}>
            <Users size={18} /> Customers
          </button>
          <button className={`${styles.navBtn} ${activeTab === 'inventory' ? styles.active : ''}`} onClick={() => setActiveTab('inventory')}>
            <Package size={18} /> Inventory
          </button>
        </nav>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Dashboard</h1>
          {activeTab === 'orders' && (
            <button className={styles.exportBtn} onClick={generateCSV}>
              <Download size={16} /> Export CSV
            </button>
          )}
        </div>

        <div className={styles.content}>
          {activeTab === 'orders' && (
            <div className={styles.card}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Variant</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.customer}</td>
                      <td>{order.variant}</td>
                      <td>{order.qty}</td>
                      <td>₹{order.amount}</td>
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

          {activeTab === 'inventory' && (
            <div className={styles.inventoryGrid}>
              {MOCK_INVENTORY.map(item => (
                <div key={item.variant} className={`${styles.inventoryCard} ${item.stock < 20 ? styles.lowStock : ''}`}>
                  <div className={styles.variantColor} style={{ backgroundColor: item.variant === 'Blush' ? '#f4e9e4' : '#4a2c3a' }} />
                  <div>
                    <h3>{item.variant}</h3>
                    <p className={styles.stockCount}>{item.stock} in stock</p>
                    {item.stock < 20 && <span className={styles.alertText}>Low Stock Alert!</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'customers' && (
            <div className={styles.card}>
              <p style={{ padding: '2rem', color: '#666' }}>Customer directory module goes here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
