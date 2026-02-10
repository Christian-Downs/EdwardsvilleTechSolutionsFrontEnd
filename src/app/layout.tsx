import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Edwardsville Tech Solutions | Web Development, AI & Automation",
    template: "%s | Edwardsville Tech Solutions",
  },
  description:
    "Edwardsville Tech Solutions builds modern websites, AI chatbots, and automation systems for small businesses and startups in the Edwardsville, IL area. Fast delivery, transparent pricing, local support.",
  keywords: [
    "web development Edwardsville IL",
    "AI chatbot development",
    "small business website",
    "Edwardsville web design",
    "tech consulting Illinois",
    "custom website development",
    "automation solutions",
    "local web developer",
  ],
  authors: [{ name: "Edwardsville Tech Solutions" }],
  creator: "Edwardsville Tech Solutions",
  publisher: "Edwardsville Tech Solutions",
  metadataBase: new URL("https://www.edwardsvilletechsolutions.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.edwardsvilletechsolutions.com",
    siteName: "Edwardsville Tech Solutions",
    title: "Edwardsville Tech Solutions | Web Development, AI & Automation",
    description:
      "Modern websites, AI chatbots, and automation systems for small businesses. Local expertise, fast delivery, transparent pricing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edwardsville Tech Solutions | Web Development, AI & Automation",
    description:
      "Modern websites, AI chatbots, and automation systems for small businesses. Local expertise, fast delivery.",
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
  verification: {
    // Add your Google Search Console verification code here once you have it
    // google: "your-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Edwardsville Tech Solutions",
  description:
    "Web development, AI chatbot development, and automation solutions for small businesses and startups.",
  url: "https://www.edwardsvilletechsolutions.com",
  telephone: "+1-518-879-6827",
  email: "christian.downs.15@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Edwardsville",
    addressRegion: "IL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.8114,
    longitude: -89.9531,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 38.8114,
      longitude: -89.9531,
    },
    geoRadius: "50000",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [],
  service: [
    {
      "@type": "Service",
      name: "Custom Web Development",
      description: "Modern, SEO-ready websites and web applications.",
    },
    {
      "@type": "Service",
      name: "AI Chatbot Development",
      description: "Smart chatbots for customer engagement and support automation.",
    },
    {
      "@type": "Service",
      name: "Technical Consulting & Training",
      description: "Workshops, code reviews, and roadmap guidance for teams.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
