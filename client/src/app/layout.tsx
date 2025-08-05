import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Spline from "@splinetool/react-spline/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drive",
  description: "An decentralized file storage system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 min-h-screen relative`}
      >
        {/* Spline 3D Background */}
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
          <Spline scene="https://prod.spline.design/SLpbZRMWmBbbeDq2/scene.splinecode" />
        </div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-2 w-full relative z-10">
          <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
