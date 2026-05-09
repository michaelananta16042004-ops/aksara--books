"use client";
import styles from "./GenreFilter.module.css";

export default function GenreFilter({ categories, activeGenre, onGenreChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.pill} ${activeGenre === cat.id ? styles.active : ""}`}
            onClick={() => onGenreChange(cat.id)}
          >
            <span className={styles.pillIcon}>{cat.icon}</span>
            <span>{cat.label}</span>
            <span className={styles.count}>{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
