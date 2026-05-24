import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, DM_Sans } from 'next/font/google'
import "./globals.css";
import { SmoothScrollProvider } from "../providers/SmoothScrollProvider";

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const body = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: 'JOSH P.S — Technical Lead',
    template: '%s | JOSH P.S'
  },
  description: 'Portfolio of Josh P.S, a Technical Lead specializing in system architecture, clean code, and interactive web experiences.',
  keywords: ['Josh P.S', 'Stiven Josh', 'Technical Lead', 'Portfolio', 'Web Developer', 'Backend Developer', 'Indonesia'],
  authors: [{ name: 'Josh P.S' }],
  creator: 'Josh P.S',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joshps.dev',
    title: 'JOSH P.S — Technical Lead',
    description: 'Portfolio of Josh P.S.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'JOSH P.S Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOSH P.S — Technical Lead',
    description: 'Portfolio of Josh P.S.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${mono.variable} ${body.variable} font-body antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
