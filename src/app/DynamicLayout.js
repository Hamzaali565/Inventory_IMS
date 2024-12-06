"use client"; // Since this component relies on client-side behavior

import React from "react";
import { StoreProvider } from "@/store/storeProvider"; // Import the StoreProvider
import Header from "./components/Header";
import { usePathname } from "next/navigation";

const DynamicLayout = ({ fonts, children }) => {
  const pathname = usePathname(); // Get the current route
  const isLoginPage = pathname === "/screens/Auth"; // Check if it's the login page

  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} antialiased`}
        >
          <div key={pathname}>
            {!isLoginPage && <Header />}{" "}
            {/* Show Header unless it's the login page */}
            <main>{children}</main> {/* Render main content */}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
};

export default DynamicLayout;
