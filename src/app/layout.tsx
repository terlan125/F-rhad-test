import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "Realtors Caspian | Daşınmaz Əmlak və Lüks Evlər",
    template: "%s | Realtors Caspian",
  },
  description:
    "Realtors Caspian - Bakıda və Xəzər sahilində lüks mənzillər, villalar və kommersiya daşınmaz əmlak elanları. Xəyallarınızdakı evi bizimlə tapın.",
  keywords: [
    "Realtors Caspian",
    "daşınmaz əmlak",
    "ev elanları",
    "Bakıda mənzil",
    "lüks villa",
    "xəzər sahilində evlər",
    "kirayə mənzil",
    "satılıq evlər",
  ],
  authors: [{ name: "Realtors Caspian" }],
  openGraph: {
    title: "Realtors Caspian | Daşınmaz Əmlak və Lüks Evlər",
    description:
      "Bakıda və Xəzər sahilində lüks mənzillər, villalar və kommersiya daşınmaz əmlak elanları.",
    siteName: "Realtors Caspian",
    locale: "az_AZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-gray-100 font-sans">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
