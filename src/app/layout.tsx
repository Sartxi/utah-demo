import "./styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./ui/header";
import Footer from "./ui/footer";
import SaWidget from "./sa-editor/widget";
import { getMetaData, getNav } from "../../lib/db";

const font = Montserrat({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

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
