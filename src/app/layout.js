"use client"; // This makes the layout component client-side
import localFont from "next/font/local";
import "./globals.css";
import DynamicLayout from "./DynamicLayout"; // Import the new component
import { useSelector } from "react-redux";

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

export default function RootLayout({ children }) {
  // const url = useSelector((state) => state.main.url);
  // console.log("url", url);

  const fonts = { geistSans, geistMono }; // Pass fonts as a prop
  return (
    <DynamicLayout fonts={fonts}>
      {children} {/* Pass children between the tags */}
    </DynamicLayout>
  );
}
