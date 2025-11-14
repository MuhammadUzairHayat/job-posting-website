'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ViewMoreButtonProps {
  href: string;
  label?: string;
}

export default function ViewMoreButton({ href, label = "View More" }: ViewMoreButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
