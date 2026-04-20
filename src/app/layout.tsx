import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculate My Dahej | Dahej Calculator – Spread Awareness About Dowry",
  description:
    "A satirical, awareness-spreading tool that calculates 'dahej' (dowry) amounts for brides and grooms based on Indian society's outdated stereotypes. Let's laugh at the absurdity and end dowry together.",
  keywords: ["dahej", "dowry", "india", "awareness", "dowry calculator", "dahej calculator", "stop dowry"],
  openGraph: {
    title: "Calculate My Dahej – Dahej Calculator",
    description: "Satirical dowry calculator to spread awareness about the dowry system in India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
