export type ThemeColors = {
  textColor: string;
  linkColor: string;
  headingColor: string;
  primary: string;
  secondary: string;
};

export type GradientTheme = {
  gradient: string;
  colors: ThemeColors;
};

export type ThemeContextType = {
  currentTheme: GradientTheme;
  changeTheme?: () => void;
};
