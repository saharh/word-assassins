import HeaderAuth from "@/components/header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Providers from "./providers";
import { Footer } from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Word Assassin",
  description: "Word Assassin is a game of deception and deduction for friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="min-h-screen flex flex-col">
              <HeaderAuth />
              <main className="flex-1 flex flex-col items-center">
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
