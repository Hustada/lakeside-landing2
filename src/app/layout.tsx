import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from '@/components/ThemeRegistry/theme-registry';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakeside Landing - Luxury Lakefront Property",
  description: "Experience the perfect lakefront getaway at Lakeside Landing. Book your stay at our stunning 3-bedroom retreat with breathtaking views and modern amenities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
