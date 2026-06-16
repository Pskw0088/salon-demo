import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export const metadata: Metadata = {
  title: "Glamour Studio - Premium Salon & Beauty Services",
  description: "Experience luxury beauty services at Glamour Studio. Expert stylists, premium products, and personalized treatments for hair, skin, nails, and more.",
  keywords: "salon, beauty, hair salon, spa, facial, bridal makeup, nail art, hair color",
  openGraph: {
    title: "Glamour Studio - Premium Salon & Beauty Services",
    description: "Experience luxury beauty services at Glamour Studio.",
    type: "website",
    locale: "en_IN",
    siteName: "Glamour Studio",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-cream text-gray-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
