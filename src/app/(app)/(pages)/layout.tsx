import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../../../public/css/globals.css";

const nunito = Nunito({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/images/logo-simple.png" sizes="any" />
        <body className={nunito.className} suppressHydrationWarning={true}>{children}</body>
      </html>
    </ClerkProvider>
    
  );
}