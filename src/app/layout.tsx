import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Veresies Training Center",
    template: "%s | Veresies Training Center",
  },
  description:
    "Your space for guided self-discovery and personal growth: trainings, focused programs and practices.",
};

export const viewport: Viewport = { themeColor: "#2f5a62" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
