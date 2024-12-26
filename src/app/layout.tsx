import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import AsideMenu from "./aside-menu";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FunTesting",
  description: "Testing made fun",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`grid grid-cols-12 gap-x-12 ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="pr-32 flex justify-end col-span-12 h-12 mb-24">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main className="col-start-2 col-span-9 mb-24">
            <div className="w-full">
              {children}
            </div>
          </main>
          <aside className="">
            <Suspense fallback={'Cargando el menú lateral ...'}>
              <AsideMenu />
            </Suspense>
          </aside>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}