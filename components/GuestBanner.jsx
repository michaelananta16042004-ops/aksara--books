"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./GuestBanner.module.css";

export default function GuestBanner() {
  const [isGuest, setIsGuest] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const session = localStorage.getItem("aksara_session");
      setIsGuest(!session);
    };
    check();
    window.addEventListener("sessionUpdated", check);
    return () => window.removeEventListener("sessionUpdated", check);
  }, []);

  if (!mounted || !isGuest || dismissed) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.icon}>🎁</span>
          <div>
            <p className={styles.title}>Daftar & dapatkan diskon 10% untuk pembelian pertama!</p>
            <p className={styles.sub}>Login untuk menambahkan buku ke keranjang dan menikmati pengalaman belanja penuh.</p>
          </div>
        </div>
        <div className={styles.actions}>
          <Link href="/register" className={styles.registerBtn}>Daftar Gratis</Link>
          <Link href="/login" className={styles.loginBtn}>Masuk</Link>
          <button className={styles.dismiss} onClick={() => setDismissed(true)} aria-label="Tutup">✕</button>
        </div>
      </div>
    </div>
  );
}
