import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: {
    default: "Easy Nihongo School | জাপানি শেখা সহজভাবে",
    template: "%s | Easy Nihongo School",
  },
  description: "বাংলায় জাপানি Grammar ও Kanji শিখুন JLPT N5 থেকে N1 পর্যন্ত।",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="mt-20 border-t border-line bg-white">
          <div className="container-page flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold">
                Easy Nihongo School <span className="text-vermilion">日</span>
              </p>
              <p className="mt-1 text-sm text-stone-500">
                জাপানি শেখা, সহজভাবে।
              </p>
            </div>
            <p className="text-xs text-stone-500">
              © {new Date().getFullYear()} Easy Nihongo School
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
