import { ThemeProvider } from "./(theme)/contexts/ThemeContext";
import BackgroundGradient from "./(theme)/background/BackgroundGradient";
import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <BackgroundGradient />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
