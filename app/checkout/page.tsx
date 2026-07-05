"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./Checkout.module.css";
import { Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate mock payment gateway delay
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      // Pass a mock order ID
      router.push(`/confirmation?orderId=ORD-${Math.floor(Math.random() * 1000000)}`);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <button onClick={() => router.push('/product')} className={styles.btn}>
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Secure Checkout</h1>
      
      <div className={styles.layout}>
        <form className={styles.formSection} onSubmit={handlePlaceOrder}>
          <div className={styles.sectionHeader}>
            <h2>Shipping Information</h2>
            <p>Your order will arrive in plain, unbranded packaging.</p>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input required type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="address1">Address Line 1</label>
              <input required type="text" id="address1" name="address1" value={formData.address1} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="address2">Address Line 2 (Optional)</label>
              <input type="text" id="address2" name="address2" value={formData.address2} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="city">City</label>
              <input required type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className={styles.row2}>
              <div className={styles.inputGroup}>
                <label htmlFor="state">State</label>
                <input required type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="pincode">Pincode</label>
                <input required type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className={styles.paymentSection}>
            <h2>Payment Method</h2>
            <div className={styles.paymentNotice}>
              <Lock size={16} />
              <p>This is a simulated prepaid checkout. Real orders require a configured payment gateway (Razorpay/PayU) during production.</p>
            </div>
            <div className={styles.mockGateway}>
              <p><strong>Total Amount:</strong> ₹{cartTotal}</p>
              <p className={styles.reassuranceNote}>Your order will arrive in plain, unbranded packaging.</p>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isProcessing}>
            {isProcessing ? "Processing Secure Payment..." : "Place Order (Simulate Payment)"}
          </button>
        </form>

        <div className={styles.summarySection}>
          <h2>Order Summary</h2>
          <div className={styles.summaryItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.summaryItemInfo}>
                  <p className={styles.summaryItemName}>{item.name}</p>
                  <p className={styles.summaryItemVariant}>{item.variant} x {item.quantity}</p>
                </div>
                <p className={styles.summaryItemPrice}>₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
