"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useRef } from "react";
import styles from "./HamburgerButton.module.css";
import gsap from "gsap";

export default function HamburgerButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  const { currentTheme } = useTheme();
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const addToRefs = (el: HTMLSpanElement | null): void => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Aplica o gradient na borda
      if (buttonRef.current) {
        buttonRef.current.style.setProperty(
          "--border-gradient",
          currentTheme.gradient
        );
        buttonRef.current.style.borderColor = "transparent";
      }

      // Animação das linhas
      linesRef.current.forEach((line) => {
        gsap.to(line, {
          backgroundImage: currentTheme.gradient,
          backgroundSize: "200% 200%",
          duration: 0.3,
        });

        gsap.to(line, {
          backgroundPosition: "0% 0%",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      });

      // Linha do meio desaparece
      gsap.to(linesRef.current[1], {
        opacity: 0,
        duration: 0.3,
      });

      // Linha superior rotaciona para formar o X
      gsap.to(linesRef.current[0], {
        rotation: 45,
        y: 9,
        width: "100%",
        left: "0%",
        duration: 0.3,
      });

      // Linha inferior rotaciona para formar o X
      gsap.to(linesRef.current[2], {
        rotation: -45,
        y: -9,
        width: "100%",
        left: "0%",
        duration: 0.3,
      });
    } else {
      // Remove o gradient da borda
      if (buttonRef.current) {
        buttonRef.current.style.setProperty("--border-gradient", "none");
        buttonRef.current.style.borderColor = currentTheme.colors.textColor;
      }

      // Remove o gradient das linhas
      linesRef.current.forEach((line) => {
        gsap.to(line, {
          backgroundImage: "none",
          backgroundColor: currentTheme.colors.textColor,
          duration: 0.3,
        });
      });

      // Retorna ao estado original
      gsap.to(linesRef.current[1], {
        opacity: 1,
        duration: 0.3,
      });

      // Centraliza as linhas reduzidas
      gsap.to(linesRef.current[0], {
        rotation: 0,
        y: 0,
        width: "75%",
        left: "12.5%",
        duration: 0.3,
      });

      gsap.to(linesRef.current[2], {
        rotation: 0,
        y: 0,
        width: "75%",
        left: "12.5%",
        duration: 0.3,
      });
    }

    return () => {
      linesRef.current.forEach((line) => {
        gsap.killTweensOf(line);
      });
    };
  }, [currentTheme, isOpen]);

  return (
    <button
      ref={buttonRef}
      className={styles.hamburger}
      onClick={onClick}
      style={
        {
          borderColor: currentTheme.colors.textColor,
          "--border-gradient": "none",
        } as React.CSSProperties
      }
    >
      <div className={styles.hamburgerIcon}>
        {[0, 1, 2].map((_, index) => (
          <span
            key={index}
            ref={addToRefs}
            className={styles.line}
            style={{ backgroundColor: currentTheme.colors.textColor }}
          />
        ))}
      </div>
    </button>
  );
}
