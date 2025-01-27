"use client";
import { useEffect, useRef } from "react";
import styles from "../../styles/components/Teste.module.css";
import { useTheme } from "@/app/hooks/useTheme";

export default function GradientText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();

  const drawText = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configura o canvas para ocupar toda a altura da viewport
    canvas.width = container.offsetWidth;
    canvas.height = window.innerHeight;

    // Calcula tamanhos responsivos
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const titleSize = Math.min(vw * 0.06, 96); // 6rem com máximo de 96px
    const textSize = Math.min(vw * 0.08, 128); // 8rem com máximo de 128px

    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // Cria a máscara
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#fff";

    const centerX = canvas.width / 2;

    // Desenha o título
    ctx.font = `bold ${titleSize}px 'Alice', serif`;
    ctx.fillText("More about Yan", centerX, 80);

    // Configura fonte para os textos secundários
    ctx.font = `italic 600 ${textSize}px 'Public Sans', sans-serif`;

    // Primeira linha
    ctx.fillText("I love GARFIELD and Art...", centerX, 200);

    // Segunda linha
    ctx.fillText("☀️ I hate mondays", centerX, 330);

    // Terceira linha
    ctx.fillText("In my free time, I love", centerX, 450);
    ctx.fillText("reading philosophical", centerX, 550);
    ctx.fillText("literature", centerX, 650);

    // Aplica a máscara ao container
    container.style.maskImage = `url(${canvas.toDataURL()})`;
    container.style.webkitMaskImage = `url(${canvas.toDataURL()})`;
  };

  useEffect(() => {
    drawText();

    // Adiciona listener para redimensionamento
    const handleResize = () => {
      drawText();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div
        ref={containerRef}
        className={styles.teste}
        style={{ background: currentTheme.colors.textColor }}
      >
        <h1 className={styles.gradientText}>More about Yan</h1>
      </div>
    </div>
  );
}
