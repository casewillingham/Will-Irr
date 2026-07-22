import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getLocalBusinessJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Sprinkler Repair Benbrook & Fort Worth`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  // Favicon / apple icons: app/favicon.ico, app/icon.png, app/apple-icon.png
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/photos/hero-lawn.jpg",
        width: 2400,
        height: 1600,
        alt: site.name,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusiness = await getLocalBusinessJsonLd();

  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col overflow-x-clip bg-white font-body text-ink antialiased">
        <JsonLd data={localBusiness} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
