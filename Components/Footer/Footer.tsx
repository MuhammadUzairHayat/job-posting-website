"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center justify-center">
        {/* Company Info */}
          {" "}
          <div className="flex flex-col items-center">
        <div>
            <h3 className="text-xl font-semibold text-white">JobBoard</h3>
            <p className="mt-2 text-sm">
              Bridging talent with opportunity. Find your dream job or the right
              candidate, faster.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center">
          <div>
            <h4 className="font-semibold text-white mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/jobs">Jobs</Link>
              </li>
              <li>
                <Link href="/postJob">Post a Job</Link>
              </li>
              <li>
                <Link href="/contacts">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col items-center">
          <div>
            <h4 className="font-semibold text-white mb-2">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center">
          <div>
            <h4 className="font-semibold text-white mb-2">Follow Us</h4>
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com" className="hover:text-white">
                <Facebook />
              </a>
              <a href="https://x.com" className="hover:text-white">
                <Twitter />
              </a>
                <a href="https://pk.linkedin.com" className="hover:text-white">
                <Linkedin />
                </a>
              <a href="https://github.com" className="hover:text-white">
                <Github />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} JobBoard. All rights reserved. <br />
        Made by <span className="text-blue-600">Muhammad Uzair</span>.
      </div>

    </footer>
  );
}
