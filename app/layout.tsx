import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ViewportZoom from "@/components/ViewportZoom";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SÖZER Yetkilendirilmiş Gümrük Müşavirliği A.Ş.",
  description:
    "Yetkilendirilmiş Gümrük Müşavirliği ve danışmanlık hizmetleri sunan firmamız ile ilgili detaylı bilgiye sitemizden ulaşabilirsiniz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip font-sans">
        <ViewportZoom />
        <Header />
        <main className="flex-1 overflow-x-clip">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
