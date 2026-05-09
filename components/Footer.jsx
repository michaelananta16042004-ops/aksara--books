import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>A</span>
            <span className={styles.logoText}>Aksara Books</span>
          </div>
          <p className={styles.tagline}>
            Setiap buku adalah jendela menuju dunia yang lebih luas. Temukan
            petualangan berikutmu bersama kami.
          </p>
          <div className={styles.socials}>
            {["ig", "tw", "yt"].map((s) => (
              <a key={s} href="#" className={styles.socialBtn} aria-label={s}>
                {s === "ig" ? "📸" : s === "tw" ? "🐦" : "▶️"}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linkGroup}>
          <h4>Navigasi</h4>
          <ul>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/katalog">Katalog</Link></li>
            <li><Link href="/keranjang">Keranjang</Link></li>
            <li><Link href="/tentang">Tentang Kami</Link></li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Genre</h4>
          <ul>
            <li><Link href="/katalog?genre=Fiksi">Fiksi</Link></li>
            <li><Link href="/katalog?genre=Sejarah">Sejarah</Link></li>
            <li><Link href="/katalog?genre=Teknologi">Teknologi</Link></li>
            <li><Link href="/katalog?genre=Pengembangan Diri">Self-Help</Link></li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Bantuan</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Cara Pemesanan</a></li>
            <li><a href="#">Kebijakan Pengembalian</a></li>
            <li><a href="#">Hubungi Kami</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Aksara Books. Dibuat dengan 📖 untuk para pecinta buku.</p>
      </div>
    </footer>
  );
}
