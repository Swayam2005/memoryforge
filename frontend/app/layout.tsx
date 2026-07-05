import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MemoryForge",
  description: "AI-powered long-term memory assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="bg-[#09090B] text-white antialiased">
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181B",
              color: "#fff",
              border: "1px solid #27272A",
            },
          }}
        />
      </body>
    </html>
  );
}