import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/provider/ConvexClientProvider";

import { Toaster, toast } from "sonner";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gacha Restaurant",
  description: "Developed by Ricky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
