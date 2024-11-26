"use client";
import { Login } from "./screens/Auth/page";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "./components/Header";
import Unit from "./screens/Inventory/Unit/page";
import Category from "./screens/Inventory/Category/page";
import Inventory from "./screens/Inventory/Item/page";
import Location from "./screens/Inventory/Location/page";
export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        {/* <Login /> */}
        {/* <Inventory /> */}
        {/* <Unit /> */}
        {/* <Category /> */}
        <Location />
      </div>
    </Provider>
  );
}