export const gradientThemes = [
  {
    gradient: "linear-gradient(45deg, var(--blue-base), var(--red-base))",
    colors: {
      textColor: "var(--red-50)",
      linkColor: "var(--red-600)",
      headingColor: "var(--red-50)",
    },
  },
  {
    gradient: "linear-gradient(45deg, var(--blue-base), var(--green-base))",
    colors: {
      textColor: "var(--green-50)",
      linkColor: "var(--green-600)",
      headingColor: "var(--green-50)",
    },
  },
  {
    gradient: "linear-gradient(45deg, var(--blue-base), var(--yellow-base))",
    colors: {
      textColor: "var(--yellow-50)",
      linkColor: "var(--yellow-600)",
      headingColor: "var(--yellow-50)",
    },
  },
  {
    gradient: "linear-gradient(45deg, var(--yellow-base), var(--green-base))",
    colors: {
      textColor: "var(--yellow-50)",
      linkColor: "var(--yellow-600)",
      headingColor: "var(--yellow-50)",
    },
  },
  {
    gradient: "linear-gradient(45deg, var(--red-base), var(--yellow-base))",
    colors: {
      textColor: "var(--red-50)",
      linkColor: "var(--yellow-600)",
      headingColor: "var(--red-50)",
    },
  },
];

export type ThemeColors = {
  textColor: string;
  linkColor: string;
  headingColor: string;
};

export type GradientTheme = {
  gradient: string;
  colors: ThemeColors;
};
