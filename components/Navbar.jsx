"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [session, setSession] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("aksara_cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  useEffect(() => {
    const updateSession = () => {
      const s = localStorage.getItem("aksara_session");
      setSession(s ? JSON.parse(s) : null);
    };
    updateSession();
    window.addEventListener("sessionUpdated", updateSession);
    return () => window.removeEventListener("sessionUpdated", updateSession);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aksara_session");
    window.dispatchEvent(new Event("sessionUpdated"));
    setDropdownOpen(false);
    router.push("/");
  };

  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/katalog", label: "Katalog" },
    { href: "/tentang", label: "Tentang" },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>A</span>
          <span className={styles.logoText}>Aksara</span>
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href="/keranjang" className={styles.cartBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          {session ? (
            <div className={styles.userMenu} ref={dropdownRef}>
              <button className={styles.avatarBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className={styles.avatar}>{getInitials(session.name)}</span>
                <span className={styles.userName}>{session.name.split(" ")[0]}</span>
                <span className={styles.chevron}>{dropdownOpen ? "▲" : "▼"}</span>
              </button>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropName}>{session.name}</p>
                    <p className={styles.dropEmail}>{session.email}</p>
                  </div>
                  <div className={styles.dropDivider}></div>
                  <Link href="/keranjang" className={styles.dropItem} onClick={() => setDropdownOpen(false)}>🛒 Keranjang Saya</Link>
                  <Link href="/katalog" className={styles.dropItem} onClick={() => setDropdownOpen(false)}>📚 Katalog Buku</Link>
                  <div className={styles.dropDivider}></div>
                  <button className={styles.dropLogout} onClick={handleLogout}>🚪 Keluar</button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/login" className={styles.loginBtn}>Masuk</Link>
              <Link href="/register" className={styles.registerBtn}>Daftar</Link>
            </div>
          )}

          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={menuOpen ? styles.barOpen : ""}></span>
            <span className={menuOpen ? styles.barOpen : ""}></span>
            <span className={menuOpen ? styles.barOpen : ""}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
