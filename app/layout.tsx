import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

const graphik = localFont({
  src: [
    {
      path: "../public/fonts/Graphik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Graphik-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-graphik",
  display: "swap",
});

const neueLeiden = localFont({
  src: [
    { path: "../public/fonts/neueleiden/NeueLeiden-Thin.woff2",       weight: "100", style: "normal" },
    { path: "../public/fonts/neueleiden/NeueLeiden-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/neueleiden/NeueLeiden-Light.woff2",      weight: "300", style: "normal" },
    { path: "../public/fonts/neueleiden/NeueLeiden-Regular.woff2",    weight: "400", style: "normal" },
    { path: "../public/fonts/neueleiden/NeueLeiden-Medium.woff2",     weight: "500", style: "normal" },
    { path: "../public/fonts/neueleiden/NeueLeiden-SemiBold.woff2",   weight: "600", style: "normal" },
    { path: "../public/fonts/neueleiden/NeueLeiden-Bold.woff2",       weight: "700", style: "normal" },
  ],
  variable: "--font-neue-leiden",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bevel - The Everything Health App",
  description:
    "Bevel is the AI health companion that turns your data into personalized insights and recommendations across sleep, fitness, nutrition, and more.",
  metadataBase: new URL("https://bevelhealth.com"),
  openGraph: {
    title: "Bevel - The Everything Health App",
    description:
      "Bevel is the AI health companion that turns your data into personalized insights and recommendations across sleep, fitness, nutrition, and more.",
    type: "website",
    url: "https://bevelhealth.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bevel - The Everything Health App",
    description:
      "Bevel is the AI health companion that turns your data into personalized insights and recommendations across sleep, fitness, nutrition, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/logos/bromak-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`lenis ${archivo.variable} ${graphik.variable} ${neueLeiden.variable}`} suppressHydrationWarning>
      <body data-scrolling-started="false" data-scrolling-direction="up">
        {children}
      </body>
    </html>
  );
}

