import React from "react";
import Image from "next/image";
import DecryptedText from "../animations/Text";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-blue-100 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        <Image
          src="/images/drive.svg"
          alt="Drive Logo"
          width={36}
          height={36}
          priority
        />
        <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Drive</span>
        <span className="ml-auto text-base sm:text-lg font-semibold px-3 py-1 rounded-lg shadow-sm">
          <DecryptedText
            text="Decentralized Storage"
            animateOn="view"
            revealDirection="center"
            speed={220}
            className="bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-emerald-300"
            parentClassName=""
            encryptedClassName="opacity-60"
          />
        </span>
      </div>
    </header>
  );
}