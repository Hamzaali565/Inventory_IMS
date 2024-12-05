"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // tweak the path please

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
