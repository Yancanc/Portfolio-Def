"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "../../styles/components/ProgressBar.module.css";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setProgress(scrollPercent * 100);
    };

    document.documentElement.style.scrollbarWidth = "none";
    (document.documentElement.style as any)["-ms-overflow-style"] = "none";
    document.body.style.overflow = "auto";

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={styles.progressContainer}
      style={{ backgroundColor: `${currentTheme.colors.textColor}100` }}
    >
      <div
        className={styles.progressBar}
        style={{
          width: `${progress}%`,
          background: currentTheme.gradient,
        }}
      />
    </div>
  );
}
