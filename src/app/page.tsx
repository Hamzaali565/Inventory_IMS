"use client";
import Header from "./components/Header";
import { Login } from "./screens/Auth/page";
import Inventory from "./screens/Inventory/Items/page";
import Unit from "./screens/Inventory/Unit/page";
import { Provider } from "react-redux";
import { store } from "../Store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        {/* <Login /> */}
        {/* <Inventory /> */}
        <Unit />
      </div>
    </Provider>
  );
}
