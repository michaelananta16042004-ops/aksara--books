"use client";
import { useState, useEffect } from "react";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.inner}>
        <div className={styles.logoMark}>
          <span className={styles.logoChar}>A</span>
          <div className={styles.spinnerRing}></div>
        </div>
        <p className={styles.brand}>Aksara Books</p>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
