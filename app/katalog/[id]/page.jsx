import { notFound } from "next/navigation";
import Link from "next/link";
import books from "@/data/books";
import AddToCartBtn from "./AddToCartBtn";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const book = books.find((b) => b.id === Number(params.id));
  if (!book) return { title: "Buku Tidak Ditemukan" };
  return {
    title: `${book.title} — ${book.author}`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.cover],
    },
  };
}

export async function generateStaticParams() {
  return books.map((b) => ({ id: String(b.id) }));
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function BookDetailPage({ params }) {
  const book = books.find((b) => b.id === Number(params.id));
  if (!book) notFound();

  const related = books.filter((b) => b.genre === book.genre && b.id !== book.id).slice(0, 3);
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">Beranda</Link>
        <span>/</span>
        <Link href="/katalog">Katalog</Link>
        <span>/</span>
        <span>{book.title}</span>
      </div>

      <div className={styles.detail}>
        <div className={styles.coverCol}>
          <div className={styles.coverWrap}>
            <img src={book.cover} alt={book.title} className={styles.cover} />
            {book.badge && <span className={styles.badge}>{book.badge}</span>}
          </div>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}><span>Halaman</span><strong>{book.pages}</strong></div>
            <div className={styles.metaItem}><span>Penerbit</span><strong>{book.publisher}</strong></div>
            <div className={styles.metaItem}><span>Tahun</span><strong>{book.year}</strong></div>
            <div className={styles.metaItem}><span>Stok</span><strong>{book.stock} buku</strong></div>
          </div>
        </div>

        <div className={styles.infoCol}>
          <span className={styles.genre}>{book.genre}</span>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.author}>oleh <strong>{book.author}</strong></p>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{"★".repeat(Math.floor(book.rating))}</span>
            <span className={styles.ratingNum}>{book.rating}</span>
            <span className={styles.reviews}>({book.reviews.toLocaleString("id")} ulasan)</span>
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.prices}>
              <span className={styles.price}>{formatPrice(book.price)}</span>
              <span className={styles.originalPrice}>{formatPrice(book.originalPrice)}</span>
              <span className={styles.discBadge}>Hemat {discount}%</span>
            </div>
          </div>

          <div className={styles.desc}>
            <h3>Deskripsi</h3>
            <p>{book.description}</p>
          </div>

          <div className={styles.isbn}>
            <span>ISBN:</span> <code>{book.isbn}</code>
          </div>

          <div className={styles.actions}>
            <AddToCartBtn book={book} />
            <Link href="/katalog" className={styles.backBtn}>← Kembali ke Katalog</Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className={styles.related}>
          <h2 className={styles.relatedTitle}>Buku Serupa</h2>
          <div className={styles.relatedGrid}>
            {related.map((b) => (
              <Link key={b.id} href={`/katalog/${b.id}`} className={styles.relatedCard}>
                <img src={b.cover} alt={b.title} />
                <div>
                  <p className={styles.relTitle}>{b.title}</p>
                  <p className={styles.relAuthor}>{b.author}</p>
                  <p className={styles.relPrice}>{formatPrice(b.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
