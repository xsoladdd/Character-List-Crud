import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import RQProvider from "@/Provider/RQProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Character List",
  description: "Created using Next13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RQProvider>
        <Header />
        <div className="container mx-auto ">{children} </div>
        </RQProvider>
      </body>
    </html>
  );
}
