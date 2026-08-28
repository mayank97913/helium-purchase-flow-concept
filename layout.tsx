import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helium Air — Purchase Flow Concept",
  description: "A clickable room-fit and installation-pricing concept for Helium Air.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
