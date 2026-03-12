import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { QuoteProvider } from "@/lib/quote-context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Throwback Threads | Premium Streetwear - No BS",
  description: "What you wear after taking care of business. Premium heavyweight 6.5oz cotton, reinforced construction, honest pricing. Boston built, streets approved. Quality you can feel from day one.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-body antialiased`}>
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
