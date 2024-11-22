"use client";
import { useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { Login } from "./screens/Auth/page";
import Inventory from "./screens/Inventory/page";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };
  return (
    <div>
      <Header />
      {/* <Login /> */}
      <Inventory />
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onOpenChange={handleOpenChange} />
    </div>
  );
}
