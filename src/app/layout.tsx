import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import { introScript } from "@/lib/intro";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: portfolio.site.title,
  description: portfolio.site.description,
  metadataBase: portfolio.site.url ? new URL(portfolio.site.url) : undefined,
  openGraph: {
    title: portfolio.site.title,
    description: portfolio.site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${garamond.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript(portfolio.intro, portfolio.effects.respectReducedMotion) }} />
        <noscript>
          <style>{".intro-overlay{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <div className="atmosphere" aria-hidden />
        {children}
      </body>
    </html>
  );
}
