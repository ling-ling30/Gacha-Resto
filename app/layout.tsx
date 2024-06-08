import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/provider/ConvexClientProvider";

import { Toaster, toast } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Quicksand({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <Toaster />
            {children}
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
