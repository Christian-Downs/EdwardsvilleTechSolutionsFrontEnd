import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edwardsville Tech Solutions",
  description: "Edwardsville Tech Solutions",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{scrollBehavior:"smooth"}}>
      
      <body className={inter.className}><Navbar />{children}</body>
    </html>
  );
}
