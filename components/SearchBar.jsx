"use client";
import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, placeholder = "Cari judul, penulis..." }) {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Cari buku"
      />
      {value && (
        <button className={styles.clearBtn} onClick={() => onChange("")} aria-label="Hapus pencarian">
          ✕
        </button>
      )}
    </div>
  );
}
