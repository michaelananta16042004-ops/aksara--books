"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from") || "/";
  const reason = searchParams.get("reason");

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Format email tidak valid";
    if (!form.password) errs.password = "Password wajib diisi";
    else if (form.password.length < 6) errs.password = "Password minimal 6 karakter";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const users = JSON.parse(localStorage.getItem("aksara_users") || "[]");
    const user = users.find((u) => u.email === form.email && u.password === form.password);

    if (!user) {
      setLoginError("Email atau password salah. Belum punya akun? Daftar dulu!");
      setLoading(false);
      return;
    }

    localStorage.setItem("aksara_session", JSON.stringify({
      name: user.name,
      email: user.email,
      loggedAt: new Date().toISOString(),
    }));
    window.dispatchEvent(new Event("sessionUpdated"));
    setLoading(false);
    router.push(fromPage === "keranjang" ? "/keranjang" : fromPage);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Side Panel */}
        <div className={styles.sidePanel}>
          <div className={styles.sidePanelInner}>
            <span className={styles.sideLogo}>A</span>
            <h2 className={styles.sideTitle}>Selamat Datang Kembali</h2>
            <p className={styles.sideDesc}>
              Masuk untuk melanjutkan perjalanan membacamu bersama ribuan buku pilihan.
            </p>
            <div className={styles.sideQuote}>
              <p>&ldquo;Membaca adalah jendela dunia yang selalu terbuka.&rdquo;</p>
            </div>
            <div className={styles.sideBooks}>📚 10K+ Judul &nbsp;·&nbsp; ⭐ 4.9 Rating &nbsp;·&nbsp; 🚚 Gratis Ongkir</div>
          </div>
        </div>

        {/* Form Panel */}
        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Masuk ke Akun</h1>
            <p className={styles.formSubtitle}>
              Belum punya akun?{" "}
              <Link href="/register" className={styles.link}>Daftar sekarang</Link>
            </p>
          </div>

          {/* Pesan alasan redirect */}
          {reason === "cart" && (
            <div className={styles.alertInfo}>
              <span>🛒</span> Kamu perlu login untuk menambahkan buku ke keranjang.
            </div>
          )}

          {loginError && (
            <div className={styles.alertError}>
              <span>⚠️</span> {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Email */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ""}`}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="nama@email.com" className={styles.input} autoComplete="email" />
              </div>
              {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <a href="#" className={styles.forgotLink}>Lupa password?</a>
              </div>
              <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ""}`}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input id="password" name="password" type={showPass ? "text" : "password"} value={form.password}
                  onChange={handleChange} placeholder="Masukkan password" className={styles.input} autoComplete="current-password" />
                <button type="button" className={styles.togglePass} onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span className={styles.btnLoader}><span className={styles.spinner}></span> Memverifikasi...</span>
              ) : "Masuk →"}
            </button>
          </form>

          <div className={styles.divider}><span>atau</span></div>

          <div className={styles.guestNote}>
            <Link href="/katalog" className={styles.guestBtn}>
              🛍️ Lanjutkan sebagai Tamu
            </Link>
            <p className={styles.guestWarning}>Tamu tidak bisa menambahkan buku ke keranjang</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
