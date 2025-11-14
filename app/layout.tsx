import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import AuthSessionProvider from "@/Context/AuthSessionProvider";
import { outfit } from "@/lib/fonts";
import Footer from "@/Components/Footer/Footer";

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
          <div className="bg-gray-50">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
