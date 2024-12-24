export interface SVGRefs {
  svgRef: React.RefObject<SVGSVGElement | null>;
  circleRef: React.RefObject<SVGCircleElement | null>;
  raysRef: React.RefObject<SVGGElement | null>;
  faceRef: React.RefObject<SVGGElement | null>;
}

export interface AnimationRefs {
  timelineRef: React.RefObject<gsap.core.Timeline | null>;
  animacoesRef: React.RefObject<gsap.core.Tween[] | null>;
}
