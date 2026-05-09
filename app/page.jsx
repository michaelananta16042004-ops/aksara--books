import Link from "next/link";
import BookCard from "@/components/BookCard";
import books from "@/data/books";
import styles from "./page.module.css";

export const metadata = {
  title: "Beranda — Aksara Books",
  description: "Selamat datang di Aksara Books. Temukan buku favoritmu dari ribuan koleksi pilihan.",
};

export default function HomePage() {
  const featured = books.filter((b) => b.badge).slice(0, 3);
  const newest = books.slice(0, 6);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>📚 Toko Buku Online #1</span>
          <h1 className={styles.heroTitle}>
            Dunia tanpa batas,<br />
            <em>dimulai dari satu halaman.</em>
          </h1>
          <p className={styles.heroDesc}>
            Lebih dari 10.000 judul buku pilihan dengan harga terbaik. Dari fiksi
            klasik hingga panduan pengembangan diri — semua ada di sini.
          </p>
          <div className={styles.heroActions}>
            <Link href="/katalog" className={styles.btnPrimary}>
              Jelajahi Katalog →
            </Link>
            <Link href="/tentang" className={styles.btnOutline}>
              Tentang Kami
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}><strong>10K+</strong><span>Judul Buku</span></div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}><strong>50K+</strong><span>Pelanggan</span></div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}><strong>4.9★</strong><span>Rating</span></div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.bookStack}>
            {books.slice(0, 3).map((b, i) => (
              <img
                key={b.id}
                src={b.cover}
                alt={b.title}
                className={styles.stackBook}
                style={{ "--i": i }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionTag}>⭐ Pilihan Editor</span>
            <h2 className={styles.sectionTitle}>Buku Unggulan</h2>
          </div>
          <Link href="/katalog" className={styles.seeAll}>Lihat Semua →</Link>
        </div>
        <div className={styles.grid3}>
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Terbaru */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionTag}>🆕 Terbaru</span>
            <h2 className={styles.sectionTitle}>Koleksi Terbaru</h2>
          </div>
          <Link href="/katalog" className={styles.seeAll}>Lihat Semua →</Link>
        </div>
        <div className={styles.grid3}>
          {newest.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h2>Mulai perjalanan membacamu hari ini</h2>
          <p>Diskon hingga 30% untuk pembelian pertama</p>
          <Link href="/katalog" className={styles.btnPrimaryLight}>Belanja Sekarang</Link>
        </div>
      </section>
    </div>
  );
}
