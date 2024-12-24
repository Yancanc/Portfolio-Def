export interface HamburgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export interface ButtonRefs {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  linesRef: React.RefObject<(HTMLSpanElement | null)[]>;
}
