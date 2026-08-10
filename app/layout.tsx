import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL(
    "https://www.vertexstudioworks.com"
  ),

  title: {
    default:
      "Vertex Studio Works | Premium Website Design & Development",

    template:
      "%s | Vertex Studio Works",
  },

  description:
    "Vertex Studio Works creates premium custom websites for startups, entrepreneurs, and growing businesses. We design fast, modern, SEO-ready websites that help businesses grow online.",

  keywords: [
    "Vertex Studio Works",
    "Vertex Studio",
    "website design",
    "web development",
    "custom website design",
    "startup website",
    "business website",
    "SEO website",
    "professional web design",
    "website development agency",
    "website design Philippines",
    "custom web development",
  ],

  authors: [
    {
      name: "Vertex Studio Works",
    },
  ],

  creator: "Vertex Studio Works",

  publisher: "Vertex Studio Works",

  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title:
      "Vertex Studio Works | Premium Website Design & Development",

    description:
      "Modern websites built for startups, entrepreneurs, and growing businesses.",

    url: "https://www.vertexstudioworks.com",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/vertex-preview.png",
        width: 1200,
        height: 630,
        alt: "Vertex Studio Works Website Design Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Vertex Studio Works | Premium Website Design",

    description:
      "Helping businesses build credibility and grow online with modern websites.",

    images: ["/vertex-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}