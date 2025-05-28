import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";
import Messenger from '@/components/Messenger/MessengerApp'; 
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mIGHT — студентський кабінет",
  description: "Система для взаємодії студентів з навчальним процесом",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black`}
      >
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
              <Topbar />

              <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-black">
                {children}
              </main>
            </div>
          </div>

          <ThemeToggle />
          <Messenger />
        </Providers>
      </body>
    </html>
  );
}
