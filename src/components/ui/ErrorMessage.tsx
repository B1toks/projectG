"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
  trigger: number;
}

export default function ErrorMessage({ message, trigger }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
}
