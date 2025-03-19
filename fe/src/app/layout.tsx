import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/core/css/globals.css";
import { ClientProviders } from "@/core/providers/client-providers";
import { RootLayout } from "@/core/providers/root-layout";
import EmotionRegistry from "@/core/components/emotion-registry";

const geistSans = localFont({
  src: "../../public//fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public//fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ระบบยืมหนังสือ",
  description: "ระบบยืมหนังสือออนไลน์",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EmotionRegistry>
          <ClientProviders>
            <RootLayout>{children}</RootLayout>
          </ClientProviders>
        </EmotionRegistry>
      </body>
    </html>
  );
}
