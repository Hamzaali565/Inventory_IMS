"use client";
import { Login } from "./screens/Auth/page";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "./components/Header";
import Unit from "./screens/Inventory/Unit/page";
import Category from "./screens/Inventory/Category/page";
import Inventory from "./screens/Inventory/Item/page";
import Location from "./screens/Inventory/Location/page";
import Stock from "./screens/Inventory/Stock/page";
import Supplier from "./screens/Supplier/page";
import PurcahseOrder from "./screens/PurOrder/page";
import GRN from "./screens/Inventory/GRN/page";
import Sales from "./screens/Sales/SaleOrder/page";
export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        {/* <Login /> */}
        {/* <Inventory /> */}
        {/* <Unit /> */}
        {/* <Category /> */}
        {/* <Location /> */}
        {/* <Stock /> */}
        {/* <Supplier /> */}
        {/* <PurcahseOrder /> */}
        {/* <GRN /> */}
        <Sales />
      </div>
    </Provider>
  );
}
