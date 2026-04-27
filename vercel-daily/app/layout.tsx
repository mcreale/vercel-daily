import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SubscriptionProvider } from "@/components/subscriptions/subscription-provider";
import RscRevalidateAckServer from "@/components/rsc-revalidate-ack-server";
import { getThemeInitScript } from "@/lib/theme";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

config.autoAddCss = false
export const metadata: Metadata = {
  title: "Vercel Daily",
  description: "News and insights for modern web developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
        />
        <SubscriptionProvider
          rscRevalidateAck={
            <Suspense fallback={null}>
              <RscRevalidateAckServer />
            </Suspense>
          }
        >
          <Header />
          <main className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black">
            {children}
          </main>
          <Footer />
        </SubscriptionProvider>
        </body>
    </html>
  );
}
