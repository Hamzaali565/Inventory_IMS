"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLoginData } from "@/store/reducer";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Sales from "./screens/Sales/SaleOrder/page";

export default function Home() {
  const dispatch = useDispatch(); // Invoke useDispatch() correctly
  const router = useRouter(); // Initialize useRouter for routing
  const url = useSelector((state) => state.main.url);
  const login = useSelector((state) => state.main.login);

  console.log("URL:", url);
  console.log("Login State:", login);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (login) {
      router.push("/screens/Sales/SaleOrder"); // Navigate to Sales page if logged in
    } else {
      router.push("/screens/Auth"); // Navigate to Login page if not logged in
    }
  }, [login, router]);

  const checkLogin = async () => {
    try {
      const response = await fetch(`${url}/login-check`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()).data.data;
      dispatch(setLogin(true));
      dispatch(setLoginData(data));
    } catch (error) {
      dispatch(setLogin(false));
      dispatch(setLoginData([]));
      console.error("Login Check Error:", error);
    }
  };

  return null; // No UI rendering here since navigation handles redirection
}
