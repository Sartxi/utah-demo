import "./styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./ui/header";
import Footer from "./ui/footer";

const font = Montserrat({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Utah Dust Free Demolition",
  description: "Dust Free Demolition Professionals in Residential and Commercial Demolition in Utah, providing both interior and exterior demolition in Utah. Call today 385-335-1499",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${font.variable}`}>
        <Header />
        <div className="main-page">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
