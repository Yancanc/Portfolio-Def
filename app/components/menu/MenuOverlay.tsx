"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/MenuOverlay.module.css";
import gsap from "gsap";
import HamburgerButton from "./HamburgerButton";
import WobleIcon from "../svgs/WobleIcon";
import {
  MenuOverlayProps,
  HamburgerButtonProps,
  MenuItem,
} from "@/app/types/menu";

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const { currentTheme } = useTheme();
  const menuItemsRef = useRef<HTMLElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isOpen) {
      // Salva a posição atual do scroll
      const scrollY = window.scrollY;

      // Aplica os estilos para prevenir scroll
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
      html.style.overflow = "hidden";

      menuItemsRef.current.forEach((item, index) => {
        // Animação inicial
        gsap.fromTo(
          item,
          {
            backgroundImage: currentTheme.gradient,
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textFillColor: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundPosition: "0% 0%",
            borderImage: currentTheme.gradient,
            borderImageSlice: 1,
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
          }
        );

        // Animação contínua do gradient
        gsap.to(item, {
          backgroundPosition: "200% 200%",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "elastic.out(1, 0.8)",
        });
      });
    } else {
      // Restaura o scroll
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      html.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      menuItemsRef.current.forEach((item) => {
        gsap.killTweensOf(item);
      });
    };
  }, [isOpen, currentTheme]);

  const menuItems: MenuItem[] = [
    { title: "Home", href: "#hero" },
    { title: "More About Yan", href: "#about" },
    { title: "My Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
    { title: "Shhhhhh", href: "#" },
  ];

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    onClose(); // Fecha o overlay

    // Pequeno timeout para dar tempo do overlay fechar
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300); // Ajuste esse valor conforme necessário
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      style={
        {
          "--border-gradient": currentTheme.gradient,
          "--background-color": currentTheme.colors.textColor,
        } as React.CSSProperties
      }
    >
      <HamburgerButton onClick={onClose} isOpen={isOpen} />
      <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={styles.menuItem}
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.title}
          </a>
        ))}
      </nav>
      <WobleIcon triggerAnimation={isHovering} />
    </div>
  );
}
