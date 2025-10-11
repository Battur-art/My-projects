import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "F1 Showcase | Speed. Precision. Legacy.",
  description:
    "Formula 1 drivers, technology, and history presented as a visual journey through the pinnacle of motorsport",
  openGraph: {
    title: "F1 Showcase | Speed. Precision. Legacy.",
    description:
      "Formula 1 drivers, technology, and history presented as a visual journey through the pinnacle of motorsport",
    type: "website",
   
  
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Oswald & Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
