import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Gulf Dev Jobs",
    template: "%s · Gulf Dev Jobs",
  },
  description:
    "A niche job board connecting Gulf-based and remote-friendly tech employers with vetted developers. Employers pay to post. Candidates apply free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-sand font-sans text-ink antialiased`}>
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
