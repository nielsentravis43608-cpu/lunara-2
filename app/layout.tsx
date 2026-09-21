import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUNARA — A personalized ritual for self-discovery",
  description: "Discover a personalized LUNARA reading and crystal recommendation through a reflective energy quiz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}