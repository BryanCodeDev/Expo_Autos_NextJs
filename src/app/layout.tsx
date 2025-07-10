// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expo Autos - Eventos de Automóviles",
  description: "Plataforma para la gestión de eventos de automóviles y exposiciones",
  keywords: ["autos", "eventos", "exposiciones", "automóviles", "cars"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p>&copy; 2025 Expo Autos. Todos los derechos reservados.</p>
              <p className="text-gray-400 text-sm mt-2">
                Plataforma de gestión de eventos automotrices
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}