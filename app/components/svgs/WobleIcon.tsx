"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import anime from "animejs";
import { WobleIconProps, Point, AnimationConfig } from "@/app/types/woble";

export default function WobleIcon({ triggerAnimation }: WobleIconProps) {
  const { currentTheme } = useTheme();
  const pathRef = useRef<SVGPathElement>(null);
  const animationConfig = useRef({
    frequency: 12,
    amplitude: 105,
    baseRadius: 120,
    tension: 0,
  });

  const createRandomPath = () => {
    animationConfig.current = {
      frequency: animationConfig.current.frequency + (Math.random() * 4 - 2),
      amplitude: animationConfig.current.amplitude + (Math.random() * 20 - 10),
      baseRadius: animationConfig.current.baseRadius + (Math.random() * 10 - 5),
      tension: Math.random(),
    };

    animationConfig.current.frequency = Math.max(
      8,
      Math.min(16, animationConfig.current.frequency)
    );
    animationConfig.current.amplitude = Math.max(
      85,
      Math.min(125, animationConfig.current.amplitude)
    );
    animationConfig.current.baseRadius = Math.max(
      100,
      Math.min(140, animationConfig.current.baseRadius)
    );

    const centerX = 175;
    const centerY = 162;
    const pointsCount = 325;
    const offset = Math.random() * Math.PI * 2;

    const anchors = [];
    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / pointsCount) * Math.PI * 2;
      const secondaryWave =
        Math.sin(angle * (animationConfig.current.frequency / 2)) * 20;
      const r =
        animationConfig.current.baseRadius +
        animationConfig.current.amplitude *
          Math.sin(angle * animationConfig.current.frequency + offset) +
        secondaryWave;

      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      anchors.push({ x, y });
    }

    const lerp = (
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      t: number
    ) => {
      return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
      };
    };

    let path = `M${anchors[0].x} ${anchors[0].y}`;

    for (let i = 0; i < pointsCount; i++) {
      const current = anchors[i];
      const next = anchors[(i + 1) % pointsCount];
      const prev = anchors[(i - 1 + pointsCount) % pointsCount];
      const afterNext = anchors[(i + 2) % pointsCount];

      const cp1 = lerp(current, afterNext, animationConfig.current.tension);
      const cp2 = lerp(next, prev, animationConfig.current.tension);

      const dirX = next.x - current.x;
      const dirY = next.y - current.y;

      const cp1Adjusted = {
        x: current.x + dirX * animationConfig.current.tension,
        y: current.y + dirY * animationConfig.current.tension,
      };
      const cp2Adjusted = {
        x: next.x - dirX * animationConfig.current.tension,
        y: next.y - dirY * animationConfig.current.tension,
      };

      path += ` C${cp1Adjusted.x} ${cp1Adjusted.y} ${cp2Adjusted.x} ${cp2Adjusted.y} ${next.x} ${next.y}`;
    }

    path += "Z";
    return path;
  };

  useEffect(() => {
    if (pathRef.current) {
      // Define o path inicial
      const initialPath = createRandomPath();
      pathRef.current.setAttribute("d", initialPath);

      anime({
        targets: pathRef.current,
        d: [
          { value: createRandomPath() },
          { value: createRandomPath() },
          { value: createRandomPath() },
        ],
        duration: 12000,
        easing: "cubicBezier(.5, .05, .1, .53)",
        loop: true,
        direction: "alternate",
        update: function (anim) {
          if (anim.progress === 100) {
            anime.set(pathRef.current, {
              d: createRandomPath(),
            });
          }
        },
      });

      anime({
        targets: "#wobleGradient",
        transform: [{ value: "rotate(0deg)" }, { value: "rotate(360deg)" }],
        duration: 15000,
        easing: "linear",
        loop: true,
      });
    }

    if (pathRef.current && triggerAnimation) {
      anime.set(pathRef.current, {
        d: createRandomPath(),
      });
    }

    return () => {
      anime.remove(pathRef.current);
      anime.remove("#wobleGradient");
    };
  }, [triggerAnimation]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 350 325"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        maxWidth: "350px",
        width: "90%",
        height: "auto",
        right: "15%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient
          id="wobleGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform="rotate(45)"
        >
          <stop offset="0%" stopColor={currentTheme.colors.primary}>
            <animate
              attributeName="offset"
              values="0;0.5;0"
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor={currentTheme.colors.secondary}>
            <animate
              attributeName="offset"
              values="0.5;1;0.5"
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path ref={pathRef} fill="url(#wobleGradient)" />
    </svg>
  );
}
