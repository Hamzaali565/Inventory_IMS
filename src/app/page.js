"use client";
import { useState } from "react";
import Header from "./components/Header";
import { Login } from "./screens/Auth/page";
import { Sales } from "./screens/Sales/SaleOrder/page"; // Assuming this is your homepage after login

export default function Home() {
  // State to track whether the user is logged in or not
  const loginData = useSelector((state) => state.main.response);

  return (
    <div>
      {!loginData ? (
        <Login /> // Show login screen if not logged in
      ) : (
        <Sales /> // Show main screen (Sales) if logged in
      )}
    </div>
  );
}
