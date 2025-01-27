"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import styles from "../../styles/components/BackgroundGradient.module.css";
import gsap from "gsap";

import { CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
  "--gradient-animation"?: string; // Adicione sua variável CSS aqui
}

export default function BackgroundGradient() {
  const { currentTheme } = useTheme();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Garante que o gradiente seja aplicado imediatamente
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundImage = currentTheme.gradient;
    }

    // Adiciona o gradiente como uma variável CSS global
    document.documentElement.style.setProperty(
      "--gradient-animation",
      currentTheme.gradient
    );

    const background = backgroundRef.current;
    if (background) {
      gsap.to(background, {
        backgroundPosition: "100% 100%",
        duration: 15,
        ease: "none",
        repeat: -1,
      });
    }
  }, [currentTheme.gradient]);

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
