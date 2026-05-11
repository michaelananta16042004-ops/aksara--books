"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Nama lengkap wajib diisi";
    } else if (form.name.trim().length < 3) {
      errs.name = "Nama minimal 3 karakter";
    }
    if (!form.email.trim()) {
      errs.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Format email tidak valid";
    }
    if (!form.password) {
      errs.password = "Password wajib diisi";
    } else if (form.password.length < 6) {
      errs.password = "Password minimal 6 karakter";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(form.password)) {
      errs.password = "Password harus mengandung huruf dan angka";
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Password tidak cocok";
    }
    if (!form.agree) {
      errs.agree = "Kamu harus menyetujui syarat & ketentuan";
    }
    return errs;
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Lemah", level: 1, color: "#ef4444" };
    if (p.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)/.test(p)) return { label: "Sedang", level: 2, color: "#f59e0b" };
    if (/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(p)) return { label: "Sangat Kuat", level: 4, color: "#10b981" };
    return { label: "Kuat", level: 3, color: "#3b82f6" };
  };

  const strength = getPasswordStrength();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    // Simpan user ke localStorage
    const users = JSON.parse(localStorage.getItem("aksara_users") || "[]");
    const emailExists = users.find((u) => u.email === form.email);
    if (emailExists) {
      setErrors({ email: "Email ini sudah terdaftar. Silakan login." });
      setLoading(false);
      return;
    }

    users.push({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      registeredAt: new Date().toISOString(),
    });
    localStorage.setItem("aksara_users", JSON.stringify(users));

    // Auto login setelah registrasi
    localStorage.setItem("aksara_session", JSON.stringify({
      name: form.name.trim(),
      email: form.email.trim(),
      loggedAt: new Date().toISOString(),
    }));
    window.dispatchEvent(new Event("sessionUpdated"));

    setLoading(false);
    setSuccess(true);

    setTimeout(() => router.push("/"), 2000);
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.successBox}>
          <span className={styles.successIcon}>🎉</span>
          <h2>Pendaftaran Berhasil!</h2>
          <p>Selamat datang, <strong>{form.name}</strong>! Kamu akan diarahkan ke halaman utama...</p>
          <div className={styles.successSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Side Panel */}
        <div className={styles.sidePanel}>
          <div className={styles.sidePanelInner}>
            <span className={styles.sideLogo}>A</span>
            <h2 className={styles.sideTitle}>Bergabung dengan Aksara Books</h2>
            <p className={styles.sideDesc}>
              Daftarkan dirimu dan nikmati pengalaman berbelanja buku yang menyenangkan.
            </p>
            <ul className={styles.perks}>
              <li>📦 Gratis ongkir untuk pembelian &gt; Rp200.000</li>
              <li>⭐ Akses ulasan & rekomendasi personal</li>
              <li>🎁 Diskon eksklusif member baru 10%</li>
              <li>📖 Wishlist & riwayat pembelian</li>
            </ul>
          </div>
        </div>

        {/* Form Panel */}
        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Buat Akun Baru</h1>
            <p className={styles.formSubtitle}>
              Sudah punya akun?{" "}
              <Link href="/login" className={styles.link}>Masuk di sini</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Nama */}
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Nama Lengkap</label>
              <div className={`${styles.inputWrap} ${errors.name ? styles.inputError : ""}`}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama lengkapmu"
                  className={styles.input}
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ""}`}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className={styles.input}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ""}`}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 karakter"
                  className={styles.input}
                  autoComplete="new-password"
                />
                <button type="button" className={styles.togglePass} onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Strength Indicator */}
              {strength && (
                <div className={styles.strengthWrap}>
                  <div className={styles.strengthBars}>
                    {[1,2,3,4].map((l) => (
                      <div
                        key={l}
                        className={styles.strengthBar}
                        style={{ background: l <= strength.level ? strength.color : "var(--border)" }}
                      />
                    ))}
                  </div>
                  <span className={styles.strengthLabel} style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
              {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}>Konfirmasi Password</label>
              <div className={`${styles.inputWrap} ${errors.confirmPassword ? styles.inputError : ""}`}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  className={styles.input}
                  autoComplete="new-password"
                />
                <button type="button" className={styles.togglePass} onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword}</p>}
            </div>

            {/* Agree */}
            <div className={styles.agreeField}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <span>
                  Saya menyetujui{" "}
                  <a href="#" className={styles.link}>Syarat & Ketentuan</a>{" "}
                  dan{" "}
                  <a href="#" className={styles.link}>Kebijakan Privasi</a>
                </span>
              </label>
              {errors.agree && <p className={styles.errorMsg}>{errors.agree}</p>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span className={styles.btnLoader}>
                  <span className={styles.spinner}></span> Mendaftarkan...
                </span>
              ) : (
                "Daftar Sekarang →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
