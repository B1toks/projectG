import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";
import Messenger from '@/components/Messenger/MessengerApp'; 

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black overflow-hidden`}>

        <Providers>{children}</Providers>
        <ThemeToggle /> 
        <Messenger />
      </body>
    </html>
  );
}