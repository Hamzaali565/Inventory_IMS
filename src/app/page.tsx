"use client";
import Header from "./components/Header";
import { Login } from "./screens/Auth/page";

export default function Home() {
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
}
