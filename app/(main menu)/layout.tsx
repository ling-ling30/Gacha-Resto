import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Navbar from "./_component/Navbar";

export const metadata: Metadata = {
  title: "What To Eat?",
  description: "Developed by Ricky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="overflow-hidden min-h-screen bg-gradient-to-r from-red-100 via-red-50 to-red-100">
      <Navbar />
      {children}
    </main>
  );
}
