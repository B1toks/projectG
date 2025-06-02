// components/sidebar.tsx
"use client";

import { Home, Book, PencilLine, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, href: "/", tooltip: "Головна" },
  { icon: Book, href: "/courses", tooltip: "Курси" },
  { icon: PencilLine, href: "/tasks", tooltip: "Завдання" },
  { icon: BarChart, href: "/stats", tooltip: "Звіти" },
];

const Sidebar = () => {
  return (
    <aside className="w-16 h-screen bg-white dark:bg-zinc-900 border-r flex flex-col items-center py-4 space-y-4 shadow">
      {/* Avatar або Logo */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6" />
      
      {/* Навігаційні кнопки */}
      {navItems.map(({ icon: Icon, href, tooltip }, i) => (
        <Link key={i} href={href}>
          <Button
            variant="ghost"
            className="p-2 hover:bg-blue-100 dark:hover:bg-zinc-800 group relative"
          >
            <Icon className="text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="absolute left-14 top-1/2 -translate-y-1/2 text-sm bg-zinc-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              {tooltip}
            </span>
          </Button>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
