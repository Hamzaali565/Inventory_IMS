// store.ts
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer";

// Define the state types
export interface MainState {
  url: string;
  // other state properties
}

export interface RootState {
  main: MainState;
}

// Create the Redux store
export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
