"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import styles from "./page.module.css";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function KeranjangPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem("aksara_cart") || "[]");
    setCart(saved);
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("aksara_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUpdate = (id, newQty) => {
    if (newQty < 1) return;
    saveCart(cart.map((i) => (i.id === id ? { ...i, qty: newQty } : i)));
  };

  const handleRemove = (id) => {
    saveCart(cart.filter((i) => i.id !== id));
  };

  const handleCheckout = () => {
    saveCart([]);
    setCheckoutDone(true);
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  if (!mounted) return null;

  if (checkoutDone) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successBox}>
          <span className={styles.successIcon}>🎉</span>
          <h2>Pesanan Berhasil!</h2>
          <p>Terima kasih telah berbelanja di Aksara Books. Buku pilihanmu sedang kami proses.</p>
          <Link href="/katalog" className={styles.shopMore}>Belanja Lagi →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Keranjang Belanja</h1>
        {cart.length > 0 && (
          <span className={styles.itemCount}>{totalItems} item</span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <h3>Keranjangmu masih kosong</h3>
          <p>Yuk, cari buku favoritmu di katalog!</p>
          <Link href="/katalog" className={styles.shopBtn}>Lihat Katalog</Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Ringkasan Pesanan</h2>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({totalItems} item)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Ongkos Kirim</span>
                <span className={shipping === 0 ? styles.free : ""}>
                  {shipping === 0 ? "GRATIS" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className={styles.shippingNote}>
                  Gratis ongkir untuk pembelian di atas {formatPrice(200000)}
                </p>
              )}
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalAmount}>{formatPrice(total)}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Bayar Sekarang →
            </button>
            <Link href="/katalog" className={styles.continueLink}>
              ← Lanjutkan Belanja
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
