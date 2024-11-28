import type { Metadata } from "next";
//import localFont from "next/font/local";
//import "./globals.css";
import AppWalletProvider from "../../components/AppWalletProvider";
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="dude12">
        {children}
      </body>
    </html>
  );
}
