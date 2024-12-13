"use client";

import { useTheme } from "@/app/(theme)/hooks/useTheme";
import styles from "./Hero.module.css";
import SunIcon from "../icons/SunIcon";
import Image from "next/image";

export default function Hero() {
  const { currentTheme } = useTheme();

  return (
    <section
      className={styles.hero}
      style={{ color: currentTheme.colors.textColor }}
    >
      <div className={styles.content}>
        <div className={styles.welcomeContainer}>
          <h1
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
          playground <SunIcon />
        </h1>
        <div className={styles.ofContainer}>
          <div className={styles.ofWrapper}>
            <h1
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
          className={styles.nameLine}
          style={{ color: currentTheme.colors.headingColor }}
        >
          Yan<span className={styles.dot}>.</span>
        </h1>
      </div>
    </section>
  );
}
