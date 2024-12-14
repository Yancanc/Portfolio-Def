"use client";

import "@/app/lib/gsap";
import { ThemeProvider } from "./contexts/ThemeContext";
import BackgroundGradient from "./components/background/BackgroundGradient";
import HamburgerButton from "./components/menu/HamburgerButton";
import MenuOverlay from "./components/menu/MenuOverlay";
import { useState } from "react";
import "./styles/globals.css";
import ProgressBar from "./components/progressBar/ProgressBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <BackgroundGradient />
          <HamburgerButton
            onClick={() => setIsMenuOpen(true)}
            isOpen={isMenuOpen}
          />
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
          {children}
          <ProgressBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
