import type { Metadata } from "next";
import { Alegreya, Alegreya_Sans, Karla } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import Header from "@/components/common/header"

export const alegreya_regular = Alegreya({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const alegreya_sans_regular = Alegreya_Sans({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const alegreya_sans_bold = Alegreya_Sans({
  weight: ['700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const karla_regular = Karla({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const karla_bold = Karla({
  weight: ['700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const metadata: Metadata = {
  title: "Brunch O'Clock",
  description: "Find the best brunches and exclusive promotions in Lisbon and Porto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla_regular.className}>  
        <div className="container max-w-screen-lg mx-auto p-0">
          <Providers>
            <Header/>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
