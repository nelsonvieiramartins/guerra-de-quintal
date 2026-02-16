import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guerra de Quintal: Mestres da Sucata",
  description: "Um jogo de tabuleiro cooperativo onde crianças defendem seu quintal de criaturas do folclore brasileiro usando armas feitas de sucata!",
  keywords: ["jogo de tabuleiro", "folclore brasileiro", "crafting", "tower defense", "cooperativo", "Saci", "Cuca", "Mula Sem Cabeça"],
  authors: [{ name: "Guerra de Quintal Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Guerra de Quintal: Mestres da Sucata",
    description: "Defenda seu quintal das criaturas do folclore brasileiro!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
