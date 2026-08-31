import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://menonabhineet.github.io/portfolio"),
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
    siteName: "Abhineet Menon Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Abhineet Menon - Profile Photo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhineet Menon | Full-Stack, AI & Data Engineer",
    description:
      "MS CS student at UIC (4.0 GPA), ex-Senior Data Engineer at LTIMindtree. Full-Stack, AI & Data Engineering Portfolio.",
    images: ["/profile.jpg"],
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
    },
    {
      "@type": "WebSite",
      "@id": "https://menonabhineet.github.io/portfolio/#website",
      "url": "https://menonabhineet.github.io/portfolio",
      "name": "Abhineet Menon Portfolio",
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
      </head>
      <body className={`${inter.className} bg-[#0b1120] text-slate-100 antialiased selection:bg-teal-400 selection:text-slate-950`}>
        {children}
        <GoogleAnalytics gaId="G-2CTHLDW5BH" />
      </body>
    </html>
  );
}