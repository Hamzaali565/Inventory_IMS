"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLoginData } from "@/store/reducer";
import Header from "./components/Header";
import { Login } from "./screens/Auth/page";
import Unit from "./screens/Inventory/Unit/page"; // Assuming this is your homepage after login

export default function Home() {
  const dispatch = useDispatch(); // Invoke useDispatch() correctly
  const url = useSelector((state) => state.main.url);
  const login = useSelector((state) => state.main.login);
  const loginData = useSelector((state) => state.main.response);

  console.log("URL:", url);
  console.log("Login State:", login);
  console.log("Login Data:", loginData);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      let response = await fetch(`${url}/login-check`, {
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

  return (
    <div>
      {!login ? (
        <Login /> // Show login screen if not logged in
      ) : (
        <Unit /> // Show main screen (e.g., Unit) if logged in
      )}
    </div>
  );
}
