// reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface State {
  login: string | null;
  url: string;
  toggle: boolean | null;
  response: unknown[];
  shift: unknown[];
}

// Define the initial state
const initialState: State = {
  login: null,
  url:
    window.location.href.split(":")[0] === "http"
      ? `http://localhost:3001/api/v1`
      : `https://ipd-server.vercel.app/api/v1`,
  toggle: null,
  response: [],
  shift: [],
};

// Create the slice
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    // Other actions can go here
  },
});

// Export the action creators
export const { setUrl } = mainSlice.actions;

// Export the reducer
export default mainSlice.reducer;
