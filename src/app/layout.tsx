import "./styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./ui/header";
import Footer from "./ui/footer";
import SaWidget from "./sa-editor/widget";
import { getNav } from "../../lib/db";

const font = Montserrat({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Utah Dust Free Demolition",
  description: "Dust Free Demolition Professionals in Residential and Commercial Demolition in Utah, providing both interior and exterior demolition in Utah. Call today 385-335-1499",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nav = await getNav();
  return (
    <html lang="en">
      <body className={`${font.variable}`}>
        <Header nav={nav} />
        <div className="main-page">
          {children}
        </div>
        <Footer nav={nav} />
        <SaWidget />
      </body>
    </html>
  );
}
