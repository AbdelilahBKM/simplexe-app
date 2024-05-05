import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import Header from "@/components/header";
import Footer from "@/components/footer";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}>
        <Header />
        
          {children}
          <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
        </body>
    </html>
  );
}
