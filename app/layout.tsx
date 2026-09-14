import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "sweet.bonanza | Surat's Premium Bakery",
  description:
    "Surat's favourite home-baked desserts. Cookie tins, brownie tubs, kunafa cookies, cakes, and festive hampers. Order online for delivery across Surat.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "sweet bonanza",
    "surat desserts",
    "cookie tin",
    "brownie tub",
    "kunafa cookies",
    "homemade desserts",
    "Surat bakery",
    "festival hampers",
    "Rakhi gifts Surat",
  ],
  openGraph: {
    title: "sweet.bonanza | Surat's Premium Bakery",
    description:
      "Surat's favourite home-baked desserts. Cookie tins, brownie tubs, kunafa, cakes & festive hampers.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-sb-text">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
