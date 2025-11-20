import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abhineet Menon | Portfolio",
  description: "Full-Stack Data Engineer & CS Master's Student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}