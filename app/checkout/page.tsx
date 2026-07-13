"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./Checkout.module.css";
import { Lock, Loader2 } from "lucide-react";

type PaymentStep = "idle" | "creating_order" | "initiating_payment" | "awaiting_payment" | "verifying";

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: { error: { description?: string; reason?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal: { ondismiss: () => void };
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>("idle");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep("creating_order");
    setError("");

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: items.map((i) => ({
            variant: i.variant,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error ?? "Failed to create order");
      }

      setPaymentStep("initiating_payment");
      const paymentRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutGroupId: orderData.checkoutGroupId }),
      });

      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) {
        throw new Error(paymentData.error ?? "Failed to initiate payment");
      }

      // Always load key from server config (avoids stale NEXT_PUBLIC build cache)
      const configRes = await fetch("/api/payment/config");
      const configData = await configRes.json();
      if (!configRes.ok || !configData.keyId) {
        throw new Error("Payment gateway not configured. Please try again later.");
      }
      const keyId = configData.keyId as string;

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error("Failed to load Razorpay. Check your connection and try again.");
      }

      const orderId = paymentData.order_id ?? paymentData.razorpayOrderId;
      if (!orderId || !paymentData.amount) {
        throw new Error("Invalid payment order from server. Please retry.");
      }

      setPaymentStep("awaiting_payment");
      const rzp = new window.Razorpay({
        key: keyId,
        amount: paymentData.amount,
        currency: paymentData.currency || "INR",
        name: "Silk Room",
        description: "Silk Room order — adult intimate product",
        order_id: orderId,
        prefill: {
          name: paymentData.customerName || formData.name,
          email: paymentData.customerEmail || formData.email,
          contact: paymentData.customerPhone || formData.phone,
        },
        theme: { color: "#4a2c3a" },
        handler: async (response) => {
          setPaymentStep("verifying");
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                checkoutGroupId: orderData.checkoutGroupId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setError(verifyData.error ?? "Payment verification failed");
              setIsProcessing(false);
              setPaymentStep("idle");
              return;
            }

            clearCart();
            setIsProcessing(false);
            setPaymentStep("idle");
            router.push(`/confirmation?orderId=${verifyData.orderIds[0]}`);
          } catch {
            setError("Payment received but verification failed. Contact support with your payment ID.");
            setIsProcessing(false);
            setPaymentStep("idle");
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setPaymentStep("idle");
            setError("Payment cancelled. Your order is saved as pending — you may retry checkout.");
          },
        },
      });

      rzp.on("payment.failed", (response) => {
        setIsProcessing(false);
        setPaymentStep("idle");
        setError(
          response.error?.description ||
            response.error?.reason ||
            "Payment failed. Please try another method or card."
        );
      });

      rzp.open();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      const hint =
        /price|variant|stock/i.test(message)
          ? " Tip: clear your cart and add the product again (prices/types were updated)."
          : "";
      setError(message + hint);
      setIsProcessing(false);
      setPaymentStep("idle");
    }
  };

  const stepLabel: Record<PaymentStep, string> = {
    idle: "Pay Securely with Razorpay",
    creating_order: "Creating your order…",
    initiating_payment: "Connecting to Razorpay…",
    awaiting_payment: "Complete payment in Razorpay window…",
    verifying: "Verifying payment…",
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <button onClick={() => router.push("/product")} className={styles.btn}>
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
            <p>Your order ships in secure packaging with free delivery across India.</p>
          </div>

          {error && (
            <p className={styles.errorBanner} role="alert">
              {error}
            </p>
          )}

          {isProcessing && paymentStep !== "idle" && (
            <p className={styles.processingBanner} aria-live="polite">
              <Loader2 size={16} className={styles.spinner} aria-hidden />
              {stepLabel[paymentStep]}
            </p>
          )}

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
              <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile" />
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
                <input required type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} pattern="\d{6}" />
              </div>
            </div>
          </div>

          <div className={styles.paymentSection}>
            <h2>Payment Method</h2>
            <div className={styles.paymentNotice}>
              <Lock size={16} />
              <p>End-to-end encrypted checkout via Razorpay. UPI, cards, and net banking accepted. Free delivery across India.</p>
            </div>
            <div className={styles.mockGateway}>
              <p><strong>Total Amount:</strong> ₹{cartTotal}</p>
              <p className={styles.reassuranceNote}>
                Free delivery · Prepaid via Razorpay ·{" "}
                <a href="/terms" style={{ textDecoration: "underline" }}>
                  Terms and Conditions
                </a>{" "}
                ·{" "}
                <a href="/privacy" style={{ textDecoration: "underline" }}>
                  Privacy Policy
                </a>{" "}
                ·{" "}
                <a href="/shipping" style={{ textDecoration: "underline" }}>
                  Shipping Policy
                </a>{" "}
                ·{" "}
                <a href="/cancellation-and-refunds" style={{ textDecoration: "underline" }}>
                  Return &amp; Refund Policy
                </a>{" "}
                ·{" "}
                <a href="/contact" style={{ textDecoration: "underline" }}>
                  Contact Us
                </a>
              </p>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isProcessing} aria-busy={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 size={18} className={styles.spinner} aria-hidden />
                {stepLabel[paymentStep]}
              </>
            ) : (
              stepLabel.idle
            )}
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
