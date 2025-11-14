"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DesktopNavItem from "./DesktopNavItem";
import { useSession } from "next-auth/react";
import MobileNavItem from "./MobileNavItem";
import { UserAvatar } from "./UserAvatar";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler with debounce
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const navItems = [
    { href: "/", label: "Home", session: true },
    { href: "/about", label: "About", session: true },
    { href: "/dashboard", label: "Dashboard", session: true },
    { href: "/jobs", label: "Jobs", session: true },
    { href: "/contacts", label: "contacts", session: true },
    {
      href: "/signin",
      label: "Sign In",
      variant: "outline",
      session: session?.user,
    },
    { href: "/postJob", label: "Post Job", variant: "primary", session: session?.user },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                className="w-6 h-6 mr-2"
                fill="none"
              >
                <rect
                  x="2"
                  y="7"
                  width="24"
                  height="16"
                  rx="3"
                  fill="#2563eb"
                />
                <rect x="7" y="3" width="14" height="6" rx="2" fill="#6366f1" />
                <rect x="7" y="14" width="6" height="2" rx="1" fill="#fff" />
                <rect x="15" y="14" width="6" height="2" rx="1" fill="#fff" />
              </svg>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent transition-colors duration-200">
                JobBoard
                <span className="text-xs align-super bg-blue-600 text-white px-1.5 py-0.5 rounded-full ml-1">
                  free
                </span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center gap-2">
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) =>
                item.session && item.label == "Sign In" ? (
                  ""
                ) : !item.session && item.label === "Post Job" ? (
                  ""
                ) : (
                  <DesktopNavItem
                    key={index}
                    href={item.href}
                    label={item.label}
                    variant={
                      item.variant as
                        | "primary"
                        | "outline"
                        | "default"
                        | undefined
                    }
                  />
                )
              )}
            </nav>
            <UserAvatar user={session?.user} />

            {/* Mobile Menu Button */}
            <div className="flex outline-none items-center md:hidden">
              <button
                title="Menu-Toggle"
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <div className="w-6 h-6 relative">
                  {/* Hamburger icon bars */}
                  <span
                    className={`absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                      isMenuOpen
                        ? "rotate-45 top-1/2 -translate-y-1/2"
                        : "top-1"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                      isMenuOpen
                        ? "-rotate-45 top-1/2 -translate-y-1/2"
                        : "bottom-1"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item, index) => (
                item.session && item.label == "Sign In" ? (
                  ""
                ) : !item.session && item.label === "Post Job" ? (
                  ""
                ) :
                <MobileNavItem
                  key={index}
                  href={item.href}
                  label={item.label}
                  variant={item.variant ?? "default"}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
