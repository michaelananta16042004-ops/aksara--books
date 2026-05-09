import styles from "./page.module.css";

export const metadata = {
  title: "Tentang Kami",
  description: "Kenali Aksara Books — toko buku online yang hadir untuk mempertemukan pembaca dengan buku yang tepat.",
};

export default function TentangPage() {
  const team = [
    { name: "Diventranus Lei", role: "Founder & CEO", emoji: "👦" },
    { name: "Samuel Sembiring", role: "Head of Curation", emoji: "👦" },
    { name: "Bastanta remana", role: "Tech Lead", emoji: "👨‍🏫" },
    { name: "Maikhel Ananta Ginting", role: "Customer Experience", emoji: "🤝" },
     { name: "Marsaulina", role: "Writer", emoji: "👩‍💼" },
  ];

  const values = [
    { icon: "📖", title: "Literasi untuk Semua", desc: "Kami percaya membaca adalah hak setiap orang. Harga terjangkau, akses mudah." },
    { icon: "🎯", title: "Kurasi Berkualitas", desc: "Setiap buku dipilih dengan cermat oleh tim editor kami yang berpengalaman." },
    { icon: "🌱", title: "Berkelanjutan", desc: "Kami bermitra dengan penerbit lokal dan mendukung penulis-penulis Indonesia." },
    { icon: "💛", title: "Komunitas Pembaca", desc: "Lebih dari sekadar toko — kami membangun komunitas pencinta buku." },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.tag}>📚 Tentang Kami</span>
        <h1 className={styles.heroTitle}>
          Kami hadir untuk mempertemukan<br />
          <em>kamu dengan buku yang tepat.</em>
        </h1>
        <p className={styles.heroDesc}>
          Aksara Books lahir dari satu keyakinan sederhana: setiap orang berhak
          mendapatkan buku yang mengubah hidupnya. Sejak 2019, kami telah
          menghantarkan lebih dari 500.000 buku ke seluruh Indonesia.
        </p>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        {[
          { num: "500K+", label: "Buku Terjual" },
          { num: "50K+", label: "Pelanggan Setia" },
          { num: "10K+", label: "Judul Tersedia" },
          { num: "5⭐", label: "Rating Rata-rata" },
        ].map((s) => (
          <div key={s.label} className={styles.statItem}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Nilai-nilai Kami</h2>
        <div className={styles.valueGrid}>
          {values.map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tim Kami</h2>
        <div className={styles.teamGrid}>
          {team.map((t) => (
            <div key={t.name} className={styles.teamCard}>
              <span className={styles.teamEmoji}>{t.emoji}</span>
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <blockquote className={styles.quote}>
          &ldquo;Setiap buku yang sampai ke tangan pembaca adalah langkah kecil menuju dunia yang lebih bijaksana.&rdquo;
        </blockquote>
        <p className={styles.quoteBy}>— Diventranus Lei, Founder Aksara Books</p>
      </section>
    </div>
  );
}
