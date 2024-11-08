import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex justify-center ${geistSans.variable} ${geistMono.variable} antialiased px-2`}
      >
        <main className="w-full mt-24 mb-24 md:w-3/4 lg:w-4/5 flex gap-6">
          <div className="w-full">
            {children}
          </div>
          <div className="w-1/3 lg:w-1/5">
            <strong>Enlaces:</strong>
            <ul className="flex flex-col space-y-3">
              <Link href={'/'}>Home</Link>
              <Link href={'/user-epic'}>Epics</Link>
              <Link href={'/user-story'}>User stories</Link>
              <Link href={'/test-case'}>Test cases</Link>
              <Link href={'/test-execution'}>Test execution</Link>
            </ul>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
