"use client";
import styles from "./CartItem.module.css";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className={styles.item}>
      <img src={item.cover} alt={item.title} className={styles.cover} />
      <div className={styles.details}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.author}>{item.author}</p>
        <p className={styles.priceUnit}>{formatPrice(item.price)} / buku</p>
        <div className={styles.controls}>
          <div className={styles.qty}>
            <button
              className={styles.qtyBtn}
              onClick={() => onUpdate(item.id, item.qty - 1)}
              disabled={item.qty <= 1}
              aria-label="Kurangi"
            >
              −
            </button>
            <span className={styles.qtyNum}>{item.qty}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => onUpdate(item.id, item.qty + 1)}
              aria-label="Tambah"
            >
              +
            </button>
          </div>
          <span className={styles.subtotal}>{formatPrice(item.price * item.qty)}</span>
        </div>
      </div>
      <button className={styles.removeBtn} onClick={() => onRemove(item.id)} aria-label="Hapus">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  );
}
