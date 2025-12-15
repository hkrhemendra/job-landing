import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupportJobs - BPO, KPO & Call Center Jobs Only | No IT Noise",
  description:
    "A dedicated hiring platform for support roles - BPO, KPO, call center, and customer support jobs. Verified recruiters, clear shift details, and faster hiring for support professionals.",
  keywords: [
    "BPO jobs",
    "call center jobs",
    "KPO jobs",
    "customer support jobs",
    "support jobs India",
    "voice process jobs",
    "chat support jobs",
    "email support jobs",
    "inbound jobs",
    "outbound jobs",
    "night shift jobs",
    "work from home support jobs",
  ],
  authors: [{ name: "SupportJobs" }],
  creator: "SupportJobs",
  publisher: "SupportJobs",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://supportjobs.in",
    siteName: "SupportJobs",
    title: "SupportJobs - Only BPO & Call Center Jobs | No IT Noise",
    description:
      "A dedicated hiring platform for support roles. Verified recruiters, clear shift details, and faster hiring for BPO, KPO, and call center professionals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SupportJobs - Dedicated platform for support roles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SupportJobs - Only BPO & Call Center Jobs",
    description:
      "Dedicated hiring platform for support roles. Verified recruiters, clear shift details, faster hiring.",
    images: ["/og-image.png"],
    creator: "@supportjobs",
  },
  alternates: {
    canonical: "https://supportjobs.in",
  },
  category: "Jobs & Employment",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://supportjobs.in" />
        <meta name="theme-color" content="#1e40af" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SupportJobs",
              description:
                "A dedicated hiring platform for BPO, KPO, call center, and customer support jobs.",
              url: "https://supportjobs.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://supportjobs.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "SupportJobs",
                email: "hemendralalawat30@gmail.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: "Support Jobs - BPO, KPO & Call Center Opportunities",
              description:
                "Find verified BPO, KPO, and call center jobs with clear shift details and transparent hiring process.",
              hiringOrganization: {
                "@type": "Organization",
                name: "SupportJobs",
                sameAs: "https://supportjobs.in",
              },
              jobLocationType: "TELECOMMUTE",
              applicantLocationRequirements: {
                "@type": "Country",
                name: "India",
              },
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "IN",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
