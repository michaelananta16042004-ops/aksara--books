"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./BookCard.module.css";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function BookCard({ book }) {
  const [added, setAdded] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("aksara_cart") || "[]");
    const idx = cart.findIndex((i) => i.id === book.id);
    if (idx >= 0) {
      cart[idx].qty += 1;
    } else {
      cart.push({ id: book.id, title: book.title, price: book.price, cover: book.cover, author: book.author, qty: 1 });
    }
    localStorage.setItem("aksara_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <Link href={`/katalog/${book.id}`} className={styles.card}>
      <div className={styles.coverWrap}>
        <img src={book.cover} alt={book.title} className={styles.cover} loading="lazy" />
        {book.badge && <span className={styles.badge}>{book.badge}</span>}
        <span className={styles.discount}>-{discount}%</span>
        <div className={styles.overlay}>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ""}`}
            onClick={addToCart}
            aria-label="Tambah ke keranjang"
          >
            {added ? "✓ Ditambahkan!" : "🛒 Tambah ke Keranjang"}
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.genre}>{book.genre}</span>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <div className={styles.rating}>
          <span className={styles.stars}>{"★".repeat(Math.floor(book.rating))}</span>
          <span className={styles.ratingNum}>{book.rating}</span>
          <span className={styles.reviews}>({book.reviews.toLocaleString("id")})</span>
        </div>
        <div className={styles.pricing}>
          <span className={styles.price}>{formatPrice(book.price)}</span>
          <span className={styles.originalPrice}>{formatPrice(book.originalPrice)}</span>
        </div>
        {book.stock <= 5 && (
          <p className={styles.lowStock}>⚡ Sisa {book.stock} buku</p>
        )}
      </div>
    </Link>
  );
}
