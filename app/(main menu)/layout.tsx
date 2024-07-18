"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./_component/Navbar"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
