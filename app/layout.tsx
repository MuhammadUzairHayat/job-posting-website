import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/Context/AuthSessionProvider";
import { outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Made by Muhammad Uzair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add this for smoother animations */}
        <link
          rel="preload"
          href="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"
          as="script"
        />
      </head>
      <body className={`${outfit.className} bg-slate-50`}>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
