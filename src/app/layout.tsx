import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AccessibilityRoot } from "@/components/accessibility/accessibility-root";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Grigor Yankov — React & React Native Developer",
    template: "%s | Grigor Yankov",
  },
  description:
    "Senior React & React Native engineer in Sofia, Bulgaria — portfolio, articles, and notes on mobile architecture and AI-forward development.",
  keywords: [
    "Grigor Yankov",
    "React Native",
    "React",
    "TypeScript",
    "Next.js",
    "mobile development",
    "Sofia",
    "Bulgaria",
  ],
  openGraph: {
    type: "website",
    siteName: "Grigor Yankov",
    title: "Grigor Yankov — React & React Native Developer",
    description:
      "Senior React & React Native engineer — portfolio, articles, and notes on mobile architecture and AI-forward development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grigor Yankov — React & React Native Developer",
    description:
      "Senior React & React Native engineer — portfolio, articles, and notes on mobile architecture and AI-forward development.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AccessibilityRoot>{children}</AccessibilityRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
