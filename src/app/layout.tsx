import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://menonabhineet.github.io/portfolio"),
  generator: "Abhineet Menon Portfolio Engine (https://github.com/menonabhineet/portfolio)",
  title: {
    default: "Abhineet Menon | Full-Stack, AI & Data Engineer | MS CS @ UIC",
    template: "%s | Abhineet Menon",
  },
  description:
    "Official portfolio of Abhineet Menon — Master's in Computer Science student at UIC (4.0 GPA), ex-Senior Data Engineer at LTIMindtree. Specializing in AI/LLMs, RAG, Distributed Systems, and Full-Stack Engineering. Open to relocation.",
  keywords: [
    "Abhineet Menon",
    "Abhineet",
    "Menon",
    "Abhineet Menon Portfolio",
    "Abhineet Menon UIC",
    "Abhineet Menon University of Illinois Chicago",
    "Abhineet Menon Software Engineer",
    "Abhineet Menon Data Engineer",
    "Abhineet Menon Full-Stack",
    "Abhineet Menon AI",
    "Abhineet Menon LTIMindtree",
    "Abhineet Menon Relocation",
    "Data Engineer",
    "AI Engineer",
    "RAG Systems",
    "LLM Evaluation",
    "Snowflake",
    "Next.js",
    "DeepSeek",
    "Zustand",
    "Compiler Design",
    "Pro Pundits League FPL",
    "HVAC Field Estimate PWA",
    "NYC Restaurant Inspection UMAP",
  ],
  authors: [{ name: "Abhineet Menon", url: "https://menonabhineet.github.io/portfolio" }],
  creator: "Abhineet Menon",
  publisher: "Abhineet Menon",
  alternates: {
    canonical: "https://menonabhineet.github.io/portfolio",
  },
  openGraph: {
    type: "profile",
    firstName: "Abhineet",
    lastName: "Menon",
    username: "menonabhineet",
    gender: "male",
    title: "Abhineet Menon | Full-Stack, AI & Data Engineer | MS CS @ UIC",
    description:
      "Official portfolio of Abhineet Menon — Master's in Computer Science student at UIC (4.0 GPA), ex-Senior Data Engineer at LTIMindtree. Specializing in AI/LLMs, RAG, Distributed Systems, and Full-Stack Engineering.",
    url: "https://menonabhineet.github.io/portfolio",
    siteName: "Portfolio - Abhineet Menon",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Abhineet Menon - Full-Stack & AI Data Engineer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhineet Menon | Full-Stack, AI & Data Engineer",
    description:
      "MS CS student at UIC (4.0 GPA), ex-Senior Data Engineer at LTIMindtree. Full-Stack, AI & Data Engineering Portfolio.",
    images: ["/opengraph-image"],
    creator: "@menonabhineet",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://menonabhineet.github.io/portfolio/#person",
      "name": "Abhineet Menon",
      "givenName": "Abhineet",
      "familyName": "Menon",
      "email": "menonabhineet@gmail.com",
      "url": "https://menonabhineet.github.io/portfolio",
      "image": "https://menonabhineet.github.io/portfolio/profile.jpg",
      "jobTitle": "Full-Stack & AI Data Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "LTIMindtree",
      },
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "University of Illinois Chicago",
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "University of Mumbai",
        },
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "USA",
      },
      "sameAs": [
        "https://github.com/menonabhineet",
        "https://linkedin.com/in/menonabhineet",
      ],
      "knowsAbout": [
        "Computer Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Distributed Systems",
        "Data Engineering",
        "Full-Stack Development",
        "Snowflake",
        "Next.js",
        "Python",
        "TypeScript",
        "Compiler Design",
      ],
      "hasPart": [
        {
          "@type": "WebApplication",
          "name": "Pro Pundits League - FPL Addon Platform",
          "url": "https://pro-pundits-league.vercel.app",
          "applicationCategory": "SportsApplication",
          "operatingSystem": "All",
          "description":
            "Full-stack companion platform for Fantasy Premier League mini-leagues featuring real-time data sync with official FPL REST APIs and automated scoring.",
          "author": {
            "@id": "https://menonabhineet.github.io/portfolio/#person",
          },
        },
        {
          "@type": "WebApplication",
          "name": "HVAC Field Estimate - On-Site Quoting Tool",
          "url": "https://menonabhineet.github.io/hvac-field-estimate/",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "description":
            "Mobile-first, offline-resilient Progressive Web App (PWA) for HVAC technicians to generate on-site service estimates and client quotes.",
          "author": {
            "@id": "https://menonabhineet.github.io/portfolio/#person",
          },
        },
        {
          "@type": "WebApplication",
          "name": "NYC Restaurant Inspection Analytics & UMAP Explorer",
          "url": "https://menonabhineet.github.io/NYC-restaurant-viz/",
          "applicationCategory": "DataVisualization",
          "operatingSystem": "All",
          "description":
            "Interactive multi-view visual analytics platform analyzing 280,000+ NYC restaurant inspections with UMAP semantic clustering.",
          "author": {
            "@id": "https://menonabhineet.github.io/portfolio/#person",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://menonabhineet.github.io/portfolio/#website",
      "url": "https://menonabhineet.github.io/portfolio",
      "name": "Portfolio - Abhineet Menon",
      "alternateName": ["Abhineet Menon Portfolio", "Abhineet Menon"],
      "description":
        "Portfolio of Abhineet Menon — MS in Computer Science student at UIC, Data Engineer, and Full-Stack Developer.",
      "publisher": {
        "@id": "https://menonabhineet.github.io/portfolio/#person",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://menonabhineet.github.io/portfolio/#webpage",
      "url": "https://menonabhineet.github.io/portfolio",
      "name": "Abhineet Menon - Personal Portfolio & Resume",
      "about": {
        "@id": "https://menonabhineet.github.io/portfolio/#person",
      },
      "mainEntity": {
        "@id": "https://menonabhineet.github.io/portfolio/#person",
      },
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%c Designed & Developed by Abhineet Menon \\n%c https://github.com/menonabhineet/portfolio ", "background: #0f172a; color: #2dd4bf; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px 4px 0 0; border: 1px solid #1e293b;", "background: #1e293b; color: #94a3b8; font-size: 11px; padding: 3px 8px; border-radius: 0 0 4px 4px; border: 1px solid #1e293b;");`,
          }}
        />
        <link rel="icon" type="image/svg+xml" href="/portfolio/favicon.svg" />
      </head>
      <body className={`${inter.className} bg-[#0b1120] text-slate-100 antialiased selection:bg-teal-400 selection:text-slate-950`}>
        {children}
        <GoogleAnalytics gaId="G-2CTHLDW5BH" />
      </body>
    </html>
  );
}