import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner/ConsentBanner";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Cormorant_Garamond,
} from "next/font/google";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import { siteConfig } from "@/config/site";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "StackSpacer | Web, Mobile App, AI & ML Development",
    template: "%s | StackSpacer",
  },

  description:
    "StackSpacer builds custom web and mobile apps, AI automation, and machine learning solutions for startups and businesses using modern technologies.",

  alternates: { canonical: "/" },

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.name,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: "StackSpacer | Web, Mobile App, AI & ML Development",
    description:
      "StackSpacer builds custom web and mobile apps, AI automation, and machine learning solutions for startups and businesses using modern technologies.",
  },

  twitter: {
    card: "summary_large_image",
    title: "StackSpacer | Web, Mobile App, AI & ML Development",
    description:
      "StackSpacer builds custom web and mobile apps, AI automation, and machine learning solutions for startups and businesses using modern technologies.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" as="image" href="/character-1.webp" />
        {/* STEP 3 — Set consent defaults BEFORE GTM */}
        <Script
          id="google-consent-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var STORAGE_KEY = "stackspacer_consent_v1";

                window.dataLayer = window.dataLayer || [];

                window.gtag =
                  window.gtag ||
                  function () {
                    window.dataLayer.push(arguments);
                  };

                var analyticsConsent = "denied";

                try {
                  var rawConsent = localStorage.getItem(STORAGE_KEY);

                  if (rawConsent) {
                    var savedConsent = JSON.parse(rawConsent);

                    if (
                      savedConsent &&
                      savedConsent.analytics === true
                    ) {
                      analyticsConsent = "granted";
                    }
                  }
                } catch (error) {
                  analyticsConsent = "denied";
                }

                window.gtag("consent", "default", {
                  analytics_storage: analyticsConsent,
                  ad_storage: "denied",
                  ad_user_data: "denied",
                  ad_personalization: "denied",
                  wait_for_update: 500
                });
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
      >
        {/* STEP 4 — GTM loads after consent defaults */}
        <GoogleTagManager gtmId={gtmId} />

        <CustomCursor />

        <div id="noise-overlay" aria-hidden="true" />

        {children}

        {/* STEP 4 — Consent banner at bottom of layout */}
        <ConsentBanner />
      </body>
    </html>
  );
}
