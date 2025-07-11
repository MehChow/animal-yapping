// app/layout.tsx (Modify this file to wrap children with ThemeProvider)
import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers"; // Import ThemeProvider
import Header from "@/components/shared/header";
import { CloudinaryUploadProvider } from "@/context/cloudinary-upload-provider";

const tektur = Tektur({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animal Yapping - Your Daily Dose of Funny Gaming Moments",
  description:
    "Exclusive funny gaming moments from our small crew. Sit back, relax, and enjoy the yapping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning is often needed for next-themes */}
      <body className={tektur.className}>
        <ThemeProvider
          attribute="class" // Adds dark class to html element
          defaultTheme="system" // Default to system preference
          enableSystem // Allow system theme
          disableTransitionOnChange // Prevents flash of unstyled content
        >
          <CloudinaryUploadProvider>
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black">
              <Header />
              {children}
            </div>
          </CloudinaryUploadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
