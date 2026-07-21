import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mi Auto Match — Tecnología que te conecta con el auto ideal",
    template: "%s | Mi Auto Match",
  },
  description:
    "Plataforma tecnológica que conecta personas con el vehículo ideal. Inventario curado, financiamiento transparente y una experiencia diseñada para quienes valoran el tiempo.",
  keywords: [
    "autos",
    "vehículos",
    "comparador",
    "financiamiento",
    "tecnología automotriz",
    "mi auto match",
  ],
  authors: [{ name: "Mi Auto Match" }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://miautomatch.cl",
    siteName: "Mi Auto Match",
    title: "Mi Auto Match — Tecnología que te conecta con el auto ideal",
    description:
      "Encuentra, compara y financia tu próximo vehículo en una experiencia diseñada para quienes valoran el tiempo y la transparencia.",
  },
};

export const viewport: Viewport = {
  themeColor: "#014477",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
