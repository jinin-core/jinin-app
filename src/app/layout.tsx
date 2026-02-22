import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
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
  metadataBase: new URL('https://jinin.example.com'),
  title: "JININ - 隠れ地雷度診断",
  description: "あなたの本当の姿を浮き彫りにする、サイバーパンクな自己診断プラットフォーム。",
  openGraph: {
    title: "JININ - 隠れ地雷度診断",
    description: "誰も知らない「私」を、自認する。サイバーパンクな16タイプの地雷度診断アプリ。",
    url: "https://jinin.example.com/",
    siteName: "JININ",
    images: [
      {
        url: "/jirai/cyber_general.png", // Generic character image for OGP
        width: 1200,
        height: 630,
        alt: "JININ Character",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JININ - 隠れ地雷度診断",
    description: "誰も知らない「私」を、自認する。サイバーパンクな16タイプの地雷度診断アプリ。",
    images: ["/jirai/cyber_general.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cyber-black text-[#ededed] h-[100dvh] w-full overflow-hidden`}
      >
        <main className="max-w-md min-h-0 w-full h-full mx-auto flex flex-col relative shadow-2xl border-x border-gray-900 bg-black overflow-y-auto overflow-x-hidden overscroll-none">
          {/* Global Analog TV Noise Overlay */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          {children}

          {/* Global Footer */}
          <footer className="w-full text-center py-6 mt-auto bg-black relative z-10">
            <Link href="/privacy" className="text-[10px] text-gray-600 hover:text-gray-300 transition-colors underline underline-offset-4">
              プライバシーポリシー
            </Link>
          </footer>
        </main>
      </body>
    </html>
  );
}
