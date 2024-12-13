"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/app/(theme)/hooks/useTheme";
import gsap from "gsap";

export default function SunIcon() {
  const { currentTheme } = useTheme();
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const raysRef = useRef<SVGGElement>(null);
  const faceRef = useRef(null);

  useEffect(() => {
    if (raysRef.current) {
      const timeline = gsap.timeline({
        repeat: -1,
      });

      // Animação de rotação do grupo
      timeline.to(raysRef.current, {
        rotation: 360,
        duration: 10,
        ease: "none",
        transformOrigin: "center center",
      });

      return () => {
        timeline.kill();
      };
    }
  }, []);

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
