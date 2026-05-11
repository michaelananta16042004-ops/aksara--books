"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [session, setSession] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = localStorage.getItem("aksara_session");
    setSession(s ? JSON.parse(s) : null);
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

  // Tamu — tidak boleh akses keranjang
  if (!session) {
    return (
      <div className={styles.guestWall}>
        <div className={styles.guestBox}>
          <span className={styles.guestIcon}>🔒</span>
          <h2>Masuk untuk Melihat Keranjang</h2>
          <p>
            Kamu harus login terlebih dahulu untuk mengakses keranjang belanja
            dan melakukan pembelian buku.
          </p>
          <div className={styles.guestActions}>
            <Link href="/login?from=keranjang" className={styles.loginBtn}>
              Masuk Sekarang
            </Link>
            <Link href="/register" className={styles.registerBtn}>
              Buat Akun Baru
            </Link>
          </div>
          <Link href="/katalog" className={styles.continueGuest}>
            Lanjutkan sebagai tamu →
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutDone) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successBox}>
          <span className={styles.successIcon}>🎉</span>
          <h2>Pesanan Berhasil!</h2>
          <p>
            Terima kasih, <strong>{session.name}</strong>! Buku pilihanmu sedang kami
            proses dan akan segera dikirimkan.
          </p>
          <Link href="/katalog" className={styles.shopMore}>Belanja Lagi →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Greeting user yang login */}
      <div className={styles.userGreeting}>
        <span className={styles.greetAvatar}>
          {session.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
        </span>
        <div>
          <p className={styles.greetHi}>Halo, <strong>{session.name.split(" ")[0]}</strong>! 👋</p>
          <p className={styles.greetSub}>Ini keranjang belanjaanmu</p>
        </div>
      </div>

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
