"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/app/(theme)/hooks/useTheme";
import gsap from "gsap";

export default function SunIcon() {
  const { currentTheme } = useTheme();

  // Refs para manipular elementos SVG
  const svgRef = useRef<SVGSVGElement>(null); // Ref do SVG principal
  const circleRef = useRef<SVGCircleElement>(null); // Ref do círculo central
  const raysRef = useRef<SVGGElement>(null); // Ref do grupo de raios
  const faceRef = useRef<SVGGElement>(null); // Ref do grupo do rosto

  // Refs para controlar animações
  const timelineRef = useRef<gsap.core.Timeline | null>(null); // Timeline principal
  const animacoesRef = useRef<gsap.core.Tween[]>([]); // Array de animações

  useEffect(() => {
    if (raysRef.current && faceRef.current && svgRef.current) {
      // Cria timeline principal para animação contínua dos raios
      const timeline = gsap.timeline({
        repeat: -1, // Repetição infinita
      });
      timelineRef.current = timeline;

      // Animação de rotação dos raios (360 graus)
      timeline.to(raysRef.current, {
        rotation: 360,
        duration: 10,
        ease: "none",
        transformOrigin: "center center",
      });

      // Animação de balanço do rosto (pendular)
      const animacaoRosto = gsap.to(faceRef.current, {
        rotation: "10", // Rotação de 10 graus
        duration: 1.5, // Duração de 1.5 segundos
        ease: "power1.inOut", // Easing suave
        yoyo: true, // Vai e volta
        repeat: -1, // Repetição infinita
        transformOrigin: "38px 38px", // Ponto de origem da rotação
      });

      // Seleção dos elementos do rosto
      const elementos = faceRef.current.getElementsByTagName("path");
      const olhoDireito = elementos[1];
      const olhoEsquerdo = elementos[2];
      const sorriso = elementos[0];

      // Animação de piscar dos olhos
      const animacaoOlhos = gsap.to([olhoDireito, olhoEsquerdo], {
        scaleY: 0.1, // Fecha os olhos (escala vertical)
        duration: 0.1, // Duração rápida
        repeat: -1, // Repetição infinita
        repeatDelay: 3, // Espera 3 segundos entre piscadas
        transformOrigin: "center",
        yoyo: true, // Abre e fecha
      });

      // Armazena referências das animações para controle posterior
      animacoesRef.current = [animacaoRosto, animacaoOlhos];

      // Handler para quando o mouse entra no SVG
      const handleMouseEnter = () => {
        // Pausa todas as animações em andamento
        timeline.pause();
        animacaoRosto.pause();
        animacaoOlhos.pause();

        // Reseta a posição do rosto para neutro primeiro
        gsap.to(faceRef.current, {
          rotation: 0,
          duration: 0.2,
          ease: "power1.inOut",
          onComplete: () => {
            // Após reset, aplica olhos semicerrados
            gsap.to([olhoDireito, olhoEsquerdo], {
              scaleY: 0.5,
              duration: 0.2,
            });

            // Inverte o sorriso (muda o path do SVG)
            gsap.to(sorriso, {
              attr: { d: "M28 44.5C28 44.5 37 37.75 48 44.5" },
              duration: 0.2,
            });
          },
        });

        // Reset inicial dos olhos
        gsap.to([olhoDireito, olhoEsquerdo], {
          scaleY: 1,
          duration: 0.1,
        });
      };

      // Handler para quando o mouse sai do SVG
      const handleMouseLeave = () => {
        // Retoma todas as animações
        timeline.resume();
        animacaoRosto.resume();
        animacaoOlhos.resume();

        // Restaura os olhos para o estado normal
        gsap.to([olhoDireito, olhoEsquerdo], {
          scaleY: 1,
          duration: 0.2,
        });

        // Restaura o sorriso para o estado normal
        gsap.to(sorriso, {
          attr: { d: "M28 44.5C28 44.5 37 51.25 48 44.5" },
          duration: 0.2,
        });
      };

      // Adiciona os event listeners de mouse
      svgRef.current.addEventListener("mouseenter", handleMouseEnter);
      svgRef.current.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup: remove animações e event listeners quando componente é desmontado
      return () => {
        timeline.kill();
        animacaoRosto.kill();
        animacaoOlhos.kill();
        if (svgRef.current) {
          svgRef.current.removeEventListener("mouseenter", handleMouseEnter);
          svgRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, []); // Array vazio significa que o efeito só roda uma vez na montagem

  // Renderização do SVG com todos seus elementos
  return (
    <svg
      ref={svgRef}
      width="120"
      height="120"
      viewBox="-20 -20 116 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        marginLeft: "10px",
        display: "inline-block",
        verticalAlign: "middle",
        color: currentTheme.colors.headingColor,
      }}
    >
      {/* Círculo central */}
      <circle
        ref={circleRef}
        cx="38"
        cy="38"
        r="18.5"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Grupo de raios */}
      <g ref={raysRef}>
        <path
          d="M38 13L38 3"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M38 73L38 63"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M73 38L63 38"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M13 38L3 38"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M62.7488 62.7488L55.6777 55.6777"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M20.3223 20.3223L13.2512 13.2512"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M55.6777 20.3223L62.7488 13.2512"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M20.3223 55.6777L13.2512 62.7488"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      {/* Grupo do rosto */}
      <g ref={faceRef}>
        <path
          d="M28 44.5C28 44.5 37 51.25 48 44.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M32.5 28V38"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M44 28V38"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
