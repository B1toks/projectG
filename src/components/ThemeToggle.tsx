"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 transition-colors bg-white dark:bg-zinc-900 text-black dark:text-white px-2 py-2 rounded-full outline-black outline-1  dark:outline-white"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}
