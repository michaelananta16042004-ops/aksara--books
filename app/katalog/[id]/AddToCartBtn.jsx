"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddToCartBtn.module.css";

export default function AddToCartBtn({ book }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const isLoggedIn = () => !!localStorage.getItem("aksara_session");

  const handleAdd = () => {
    if (!isLoggedIn()) {
      router.push(`/login?from=/katalog/${book.id}&reason=cart`);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("aksara_cart") || "[]");
    const idx = cart.findIndex((i) => i.id === book.id);
    if (idx >= 0) {
      cart[idx].qty += 1;
    } else {
      cart.push({
        id: book.id,
        title: book.title,
        price: book.price,
        cover: book.cover,
        author: book.author,
        qty: 1,
      });
    }
    localStorage.setItem("aksara_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      className={`${styles.btn} ${added ? styles.added : ""}`}
      onClick={handleAdd}
    >
      {added ? "✓ Berhasil ditambahkan!" : "🛒 Tambah ke Keranjang"}
    </button>
  );
}
