import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweet Treats Cookie Co.",
  description: "Freshly baked cookies delivered to your door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
