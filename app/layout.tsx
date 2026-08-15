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
  metadataBase: new URL("https://www.vertexstudioworks.com"),

  /* =====================================================
     BASIC SEO
  ===================================================== */

  title: {
    default:
      "Vertex Studio Works | Premium Website Design & Development",
    template: "%s | Vertex Studio Works",
  },

  description:
    "Vertex Studio Works designs and develops premium custom websites for startups, entrepreneurs, and growing businesses. Modern, fast, mobile-friendly, and built to turn visitors into customers.",

  keywords: [
    "Vertex Studio Works",
    "Vertex Studio",
    "website design",
    "web development",
    "custom website design",
    "business website design",
    "professional website design",
    "website development",
    "web design agency",
    "custom web development",
    "SEO website design",
    "modern website design",
    "startup website design",
    "small business website",
  ],

  /* =====================================================
     CANONICAL
  ===================================================== */

  alternates: {
    canonical: "https://www.vertexstudioworks.com/",
  },

  /* =====================================================
     SEARCH ENGINE DIRECTIVES
  ===================================================== */

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* =====================================================
     BRAND / AUTHOR
  ===================================================== */

  authors: [
    {
      name: "Vertex Studio Works",
      url: "https://www.vertexstudioworks.com",
    },
  ],

  creator: "Vertex Studio Works",
  publisher: "Vertex Studio Works",
  category: "Web Design and Development",

  /* =====================================================
     FAVICON
  ===================================================== */

  icons: {
    icon: "/icon.png",
  },

  /* =====================================================
     OPEN GRAPH
  ===================================================== */

  openGraph: {
    title:
      "Vertex Studio Works | Premium Website Design & Development",

    description:
      "Premium custom websites for startups, entrepreneurs, and growing businesses. Modern design, strong performance, and experiences built to grow your business online.",

    url: "https://www.vertexstudioworks.com/",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/vertex-preview.png",
        width: 1536,
        height: 1024,
        alt:
          "Vertex Studio Works — Premium Website Design & Development",
      },
    ],
  },

  /* =====================================================
     TWITTER / X
  ===================================================== */

  twitter: {
    card: "summary_large_image",

    title:
      "Vertex Studio Works | Premium Website Design",

    description:
      "Premium custom websites for startups, entrepreneurs, and growing businesses.",

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

        {/* =====================================================
            ORGANIZATION STRUCTURED DATA
        ===================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              "@id":
                "https://www.vertexstudioworks.com/#organization",

              name: "Vertex Studio Works",

              url: "https://www.vertexstudioworks.com/",

              logo: {
                "@type": "ImageObject",
                url: "https://www.vertexstudioworks.com/icon.png",
              },

              description:
                "Vertex Studio Works designs and develops premium custom websites for startups, entrepreneurs, and growing businesses. Modern, fast, mobile-friendly, and built to turn visitors into customers.",

              sameAs: [],
            }),
          }}
        />

        {children}

        {/* =====================================================
            VERCEL WEB ANALYTICS
        ===================================================== */}

        <Analytics />

      </body>
    </html>
  );
}