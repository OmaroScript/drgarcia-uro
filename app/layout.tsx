import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Francisco Arturo García Arrieta | Urólogo Tijuana",
  description:
    "Especialista en urología mínimamente invasiva, cirugía HoLEP, cálculos renales y cáncer urológico. Líder en cirugía prostática con láser en Tijuana, BC.",
  keywords: [
    "urólogo Tijuana",
    "cirugía HoLEP",
    "cálculos renales",
    "próstata",
    "urología láser",
    "Dr García Arrieta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
