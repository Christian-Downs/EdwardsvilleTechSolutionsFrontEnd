import type { Metadata } from "next";
import { Architects_Daughter, Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";
import { services, site } from "@/lib/site";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const hand = Architects_Daughter({ subsets: ["latin"], weight: "400", variable: "--font-hand" });

const title = "Edwardsville Tech Solutions | Websites, AI Helpers & Custom Tools for Small Business";
const description =
  "Owner-led tech shop in Edwardsville, IL. Websites and upkeep, custom AI agents, AI integrations and custom business tools for small businesses across the Metro East and St. Louis area. Plain English, straight price ranges.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Edwardsville Tech Solutions" },
  description,
  keywords: [
    "AI agents for small business",
    "AI automation Edwardsville IL",
    "AI integration St. Louis",
    "web development Edwardsville IL",
    "small business website upkeep",
    "custom business software",
    "AI consulting Metro East",
    "AI phone receptionist",
    "workflow automation",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
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
  verification: {
    // Add your Google Search Console verification code here once you have it
    // google: "your-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description,
  url: site.url,
  telephone: "+1-518-879-6827",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Edwardsville",
    addressRegion: "IL",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 38.8114, longitude: -89.9531 },
  areaServed: [
    { "@type": "City", name: "Edwardsville" },
    { "@type": "AdministrativeArea", name: "Metro East" },
    { "@type": "City", name: "St. Louis" },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.fix,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
