"use client"
// components/SuccessMessage.tsx
import { useEffect, useState } from "react";

type Props = {
  message: string;
  onClose?: () => void;
};

export default function SuccessMessage({ message, onClose }: Props) {
  const [visible, setVisible] = useState(true);
  // console.log(message)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl transition-all duration-500 ease-in-out bg-gradient-to-r from-green-400 to-green-500 text-white font-medium ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      ✅ {message}
    </div>
  );
}
