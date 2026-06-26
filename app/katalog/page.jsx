"use client";
import { useState, useMemo, useEffect } from "react";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import GenreFilter from "@/components/GenreFilter";
import { getBooks, getCategories } from "@/utils/api";
import styles from "./page.module.css";

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("semua");
  const [sort, setSort] = useState("default");
  
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedBooks = await getBooks(genre);
      const fetchedCategories = await getCategories();
      setBooks(fetchedBooks);
      // Ensure 'Semua' is at the beginning of categories
      setCategories([{ id: "semua", name: "semua", label: "Semua", icon: "📚" }, ...fetchedCategories]);
      setLoading(false);
    };
    fetchData();
  }, [genre]);

  const filtered = useMemo(() => {
    let result = [...books];

    // Search realtime
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.category && b.category.name.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [search, books, sort]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.breadcrumb}>Beranda / Katalog</span>
          <h1 className={styles.title}>Katalog Buku</h1>
          <p className={styles.subtitle}>
            Temukan buku impianmu dari koleksi {books.length}+ judul pilihan
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.toolbar}>
          <SearchBar value={search} onChange={setSearch} />
          <div className={styles.sortWrap}>
            <label htmlFor="sort" className={styles.sortLabel}>Urutkan:</label>
            <select
              id="sort"
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Relevansi</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        <GenreFilter categories={categories} activeGenre={genre} onGenreChange={setGenre} />

        <div className={styles.resultInfo}>
          {search && (
            <span>Hasil pencarian untuk &quot;<strong>{search}</strong>&quot; — </span>
          )}
          <span>{filtered.length} buku ditemukan</span>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📭</span>
            <h3>Buku tidak ditemukan</h3>
            <p>Coba ubah kata kunci atau pilih genre lain</p>
            <button
              className={styles.resetBtn}
              onClick={() => { setSearch(""); setGenre("semua"); }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
