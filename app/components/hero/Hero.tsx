"use client";

import { useTheme } from "@/app/(theme)/hooks/useTheme";
import styles from "./Hero.module.css";
import SunIcon from "../icons/SunIcon";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Hero() {
  const { currentTheme } = useTheme();

  /**
   * Refs para controlar as animações dos elementos
   * welcomeRef: texto "Welcome to the"
   * playgroundRef: texto "playground"
   * ofTextRef: texto "of"
   * bioTextRef: texto da bio
   * nameRef: texto "Yan."
   * sunIconRef: ícone do sol
   */
  const welcomeRef = useRef(null);
  const playgroundRef = useRef(null);
  const ofTextRef = useRef(null);
  const bioTextRef = useRef(null);
  const nameRef = useRef(null);
  const sunIconRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Configuração inicial: todos os elementos começam invisíveis e deslocados para baixo
    gsap.set(
      [
        welcomeRef.current,
        playgroundRef.current,
        ofTextRef.current,
        bioTextRef.current,
        nameRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    // Configuração inicial do ícone do sol: começa fora da tela, invisível e rotacionado
    gsap.set(sunIconRef.current, {
      x: -100,
      opacity: 0,
      rotate: -180,
    });

    // Sequência de animações de entrada
    tl.to(welcomeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out", // Efeito de suavização na entrada
    })
      .to(playgroundRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(
        sunIconRef.current,
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.7)", // Efeito elástico na entrada do sol
        },
        "-=0.4" // Começa 0.4s antes da animação anterior terminar
      )
      .to(ofTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(bioTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

    /**
     * Função que cria o efeito de hover nas letras
     * @param element - Elemento HTML que receberá o efeito
     */
    const createHoverEffect = (element: HTMLElement) => {
      // Limpa qualquer split anterior
      const existingChars = element.querySelectorAll(".hover-char");
      existingChars.forEach((char) => {
        char.replaceWith(char.textContent || "");
      });

      // Divide o texto em caracteres individuais
      const split = new SplitType(element, {
        types: "chars",
        tagName: "span",
        charClass: "hover-char",
      });

      // Adiciona animações de hover em cada caractere
      split.chars?.forEach((char) => {
        // Animação quando o mouse entra
        char.addEventListener("mouseenter", () => {
          gsap.to(char, {
            y: -10, // Move o caractere 10px para cima
            duration: 0.3,
            ease: "power2.out",
          });
        });

        // Animação quando o mouse sai
        char.addEventListener("mouseleave", () => {
          gsap.to(char, {
            y: 0, // Retorna o caractere à posição original
            duration: 0.3,
            ease: "power2.in",
          });
        });
      });
    };

    // Aplica o efeito de hover em todos os textos
    if (playgroundRef.current) createHoverEffect(playgroundRef.current);
    if (nameRef.current) createHoverEffect(nameRef.current);
    if (welcomeRef.current) createHoverEffect(welcomeRef.current);
    if (ofTextRef.current) createHoverEffect(ofTextRef.current);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{ color: currentTheme.colors.textColor }}
    >
      <div className={styles.content}>
        <div className={styles.welcomeContainer}>
          <h1
            ref={welcomeRef}
            className={styles.welcomeLine}
            style={{ color: currentTheme.colors.headingColor }}
          >
            Welcome to the
          </h1>
        </div>
        <h1
          className={styles.playgroundLine}
          style={{ color: currentTheme.colors.headingColor }}
        >
          <span ref={playgroundRef}>playground</span>
          <span
            ref={sunIconRef}
            style={{ marginLeft: "8px", display: "inline-flex" }}
          >
            <SunIcon />
          </span>
        </h1>
        <div className={styles.ofContainer}>
          <div className={styles.ofWrapper}>
            <h1
              ref={ofTextRef}
              style={{ color: currentTheme.colors.headingColor }}
              className={styles.ofText}
            >
              of
            </h1>
            <div
              className={styles.circle}
              style={{ borderColor: currentTheme.colors.headingColor }}
            ></div>
          </div>
          <div
            ref={bioTextRef}
            className={styles.parenthesis}
            style={{ color: currentTheme.colors.headingColor }}
          >
            <span className={styles.bioText}>
              Hi, I’m Yan, a full-stack developer and designer from Brazil.
              Enjoy your visit!
            </span>
          </div>
        </div>
        <h1
          ref={nameRef}
          className={styles.nameLine}
          style={{ color: currentTheme.colors.headingColor }}
        >
          Yan<span className={styles.dot}>.</span>
        </h1>
      </div>
    </section>
  );
}
