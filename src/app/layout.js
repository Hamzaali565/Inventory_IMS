"use client"; // This makes the layout component client-side
import localFont from "next/font/local";
import "./globals.css";
import { useSelector } from "react-redux";
import { Login } from "./screens/Auth/page";
import { Sales } from "./screens/Sales/SaleOrder/page";
import Header from "./components/Header";
import { StoreProvider } from "@/store/storeProvider";

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

// Remove the metadata export from this file
export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <div>
            {!loginData ? (
              <Login /> 
            ) : ( */}
          <div>
            <Header /> {/* Header should be visible if logged in */}
            <main>{children}</main> {/* Render main content */}
          </div>
          {/* )} */}
          {/* </div> */}
        </body>
      </html>
    </StoreProvider>
  );
}
