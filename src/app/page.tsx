"use client";
import Header from "./components/Header";
import { Login } from "./screens/Auth/page";
import Inventory from "./screens/Inventory/Items/page";

export default function Home() {
  return (
    <div>
      <Header />
      {/* <Login /> */}
      <Inventory />
    </div>
  );
}
