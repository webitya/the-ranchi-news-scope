import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { BookmarksProvider } from '@/context/BookmarksContext';
import { ToastProvider } from '@/context/ToastContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "THE RANCHI NEWS SCOPE - Latest News from Ranchi & Jharkhand",
  description: "Your trusted source for breaking news, politics, business, sports, entertainment, and technology from Ranchi and Jharkhand. Stay informed with THE RANCHI NEWS SCOPE.",
  keywords: "Ranchi news, Jharkhand news, breaking news, local news, politics, business, sports, entertainment, technology",
  authors: [{ name: "THE RANCHI NEWS SCOPE" }],
  openGraph: {
    title: "THE RANCHI NEWS SCOPE - Latest News from Ranchi & Jharkhand",
    description: "Your trusted source for breaking news from Ranchi and Jharkhand",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE RANCHI NEWS SCOPE",
    description: "Latest news from Ranchi and Jharkhand",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0A1628",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BookmarksProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <MobileNav />
          </ToastProvider>
        </BookmarksProvider>
      </body>
    </html>
  );
}
