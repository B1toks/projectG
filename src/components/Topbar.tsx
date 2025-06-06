"use client";

import { Bell, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Topbar = () => {
  return (
    <header className="w-full h-16 flex justify-between items-center px-6 bg-white dark:bg-zinc-900 border-b shadow-sm">
      <Link href="/main">
      <h1 className="text-xl font-bold text-blue-600">MIGHT</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hover:bg-blue-100 dark:hover:bg-zinc-800 p-2 rounded-full">
          <Bell className="text-blue-600" />
        </Button>
        <Button variant="ghost" className="hover:bg-blue-100 dark:hover:bg-zinc-800 p-2 rounded-full">
          <UserCircle className="text-blue-600" />
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
