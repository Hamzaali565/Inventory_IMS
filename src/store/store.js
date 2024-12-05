"use client";
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "@/store/reducer";

// Define the state types

// Create the Redux store
export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
