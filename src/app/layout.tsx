import type { Metadata } from "next";
import { Inter, Cabin, Cabin_Sketch } from "next/font/google";
import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/theme-registry';
import Box from '@mui/material/Box';
import Footer from '@/components/Footer';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabin',
});
const cabinSketch = Cabin_Sketch({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabin-sketch',
});

export const metadata: Metadata = {
  title: 'Lakeside Landing',
  description: 'Your private lake retreat in rural Nebraska',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cabin.variable} ${cabinSketch.variable}`}>
      <body className={inter.className}>
        <ThemeRegistry>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            {children}
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
