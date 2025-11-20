import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Answer the Call",
  description: "Welcome to the Telos House switchboard. Begin your journey and make the right choices.",
  metadataBase: new URL('https://slush.teloshouse.com/call'),
  openGraph: {
    title: "Answer the Call",
    description: "Welcome to the Telos House switchboard. Begin your journey and make the right choices.",
    images: [
      {
        url: '/images/phone-removebg-preview.png',
        width: 800,
        height: 800,
        alt: 'Telos House Phone',
      }
    ],
    type: 'website',
    siteName: 'Telos House',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Answer the Call",
    description: "Welcome to the Telos House switchboard. Begin your journey and make the right choices.",
    images: ['/images/phone-removebg-preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
