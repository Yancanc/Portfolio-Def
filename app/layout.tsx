"use client";

import "@/app/lib/gsap";
import { ThemeProvider } from "./contexts/ThemeContext";
import HamburgerButton from "./components/menu/HamburgerButton";
import MenuOverlay from "./components/menu/MenuOverlay";
import { useState } from "react";
import "./styles/globals.css";
import ProgressBar from "./components/progressBar/ProgressBar";
import { useTheme } from "./hooks/useTheme";

function Body({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <body style={{ background: "transparent" }}>
      {/* Background base com gradiente */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: currentTheme.gradient,
          backgroundSize: "141.4% 141.4%",
          backgroundAttachment: "fixed",
          zIndex: -2,
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/noise.png')",
          backgroundRepeat: "repeat",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Conteúdo principal */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <HamburgerButton
          onClick={() => setIsMenuOpen(true)}
          isOpen={isMenuOpen}
        />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        {children}
        <ProgressBar />
      </main>
    </body>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <ThemeProvider>
        <Body>{children}</Body>
      </ThemeProvider>
    </html>
  );
}
