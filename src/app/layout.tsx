import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import { BookOpenTextIcon, FlaskConicalIcon, HomeIcon, MountainSnowIcon, WrenchIcon } from "lucide-react";

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
            <ul className="space-y-3">
              <Button variant={"link"}><HomeIcon/><Link href={'/'}>Home</Link></Button>
              <Button variant={"link"}><MountainSnowIcon/><Link href={'/user-epic'}>Home</Link></Button>
              <Button variant={"link"}><BookOpenTextIcon/><Link href={'/user-story'}>User stories</Link></Button>
              <Button variant={"link"}><FlaskConicalIcon/><Link href={'/test-case'}>Test cases</Link></Button>
              <Button variant={"link"}><WrenchIcon/><Link href={'/test-execution'}>Execution</Link></Button>
            </ul>
          </aside>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
