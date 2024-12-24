export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HamburgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export interface MenuItem {
  title: string;
  href: string;
}
