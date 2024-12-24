"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import styles from "../../styles/components/BackgroundGradient.module.css";
import gsap from "gsap";

export default function BackgroundGradient() {
  const { currentTheme } = useTheme();
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;

    gsap.to(background, {
      backgroundPosition: "100% 100%",
      duration: 15,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <>
      <div
        ref={backgroundRef}
        className={styles.background}
        style={{
          backgroundImage: currentTheme.gradient,
          backgroundSize: "141.4% 141.4%",
          backgroundPosition: "0% 0%",
        }}
      />
      <div className={styles.grain} />
    </>
  );
}
