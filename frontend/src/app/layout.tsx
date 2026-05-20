import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "../styles.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002856",
};

export const metadata: Metadata = {
  title: "ENT Flow Learn — AI-powered CFD Learning Platform",
  description: "Master computational fluid dynamics with structured courses, browser-based simulations, and an AI tutor. Built for engineers.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "ENT Flow Learn",
    description: "AI-powered CFD learning ecosystem for engineers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
