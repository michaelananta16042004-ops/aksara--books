import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: {
    default: "Aksara Books — Toko Buku Online Terpercaya",
    template: "%s | Aksara Books",
  },
  description:
    "Temukan ribuan judul buku pilihan dengan harga terbaik. Fiksi, non-fiksi, pengembangan diri, dan lebih banyak lagi di Aksara Books.",
  keywords: ["toko buku", "buku online", "aksara books", "beli buku", "novel", "non-fiksi"],
  authors: [{ name: "Aksara Books" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aksarabooks.id",
    siteName: "Aksara Books",
    title: "Aksara Books — Toko Buku Online Terpercaya",
    description: "Temukan ribuan judul buku pilihan dengan harga terbaik.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
