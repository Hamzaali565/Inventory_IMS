"use client";
import { useState } from "react";
import Header from "./components/Header";
import { Login } from "./screens/Auth/page";
import Sales from "./screens/Sales/SaleOrder/page"; // Assuming this is your homepage after login

export default function Home() {
  // State to track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login, this would be triggered after a successful login
  const handleLogin = () => {
    setIsLoggedIn(true); // Set user as logged in
  };

  return (
    <div>
      {isLoggedIn ? (
        // If logged in, show the sales page with the header
        <>
          <Header />
          <Sales />
        </>
      ) : (
        // If not logged in, show the login page
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
