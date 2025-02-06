import HeaderAuth from "@/components/header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Providers from "./providers";
import { Footer } from "@/components/footer";
import { Metadata, Viewport } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Word Assassins - A Social Deduction Game",
    template: "%s | Word Assassins",
  },
  description:
    "Word Assassins is a social deduction game where players use secret words to eliminate each other. Perfect for friends, parties, and social gatherings.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "word game",
    "social deduction",
    "party game",
    "online game",
    "multiplayer",
  ],
  creator: "Word Assassins",
  publisher: "Word Assassins",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "Word Assassins - A Social Deduction Game",
    description:
      "Word Assassins is a social deduction game where players use secret words to eliminate each other. Perfect for friends, parties, and social gatherings.",
    siteName: "Word Assassins",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Assassins - A Social Deduction Game",
    description:
      "Word Assassins is a social deduction game where players use secret words to eliminate each other.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
            >
              Skip to main content
            </a>
            <div className="min-h-screen flex flex-col">
              <HeaderAuth />
              <main
                id="main-content"
                className="flex-1 flex flex-col items-center"
                role="main"
              >
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
