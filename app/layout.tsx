import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Thermal Lexum | Extreme Thermal Performance",
    template: "%s | Thermal Lexum",
  },
  description:
    "Thermal Lexum develops high-performance thermal interface solutions engineered for modern computing systems, gamers, enthusiasts and professionals.",
  keywords: [
    "thermal paste",
    "liquid metal",
    "thermal interface material",
    "thermal pads",
    "warranty registration",
    "thermal lexum",
    "extreme thermal performance",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Thermal Lexum",
    title: "Thermal Lexum | Extreme Thermal Performance",
    description:
      "High-performance thermal interface solutions engineered for modern computing systems.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Thermal Lexum" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thermal Lexum | Extreme Thermal Performance",
    description: "High-performance thermal interface solutions for modern computing.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full antialiased" style={{ fontFamily: "Inter, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
