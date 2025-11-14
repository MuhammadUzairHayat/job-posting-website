"use client"// components/ErrorMessage.tsx
import { useEffect, useState } from "react";

type Props = {
  message: boolean | string;
  onClose?: () => void;
};

export default function ErrorMessage({ message, onClose }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl transition-all duration-500 ease-in-out 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"} 
      bg-gradient-to-r from-red-500 to-red-700 text-white font-medium`}
    >
      ❌ {message}
    </div>
  );
}
