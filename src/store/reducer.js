// reducer.js
import { createSlice } from "@reduxjs/toolkit";

// Get the URL dynamically on the client
const getUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.href.split(":")[0] === "http"
      ? `http://localhost:3001/api/v1`
      : `https://ipd-server.vercel.app/api/v1`;
  }
  return ""; // Provide a default fallback for SSR
};

// Define the initial state
const initialState = {
  login: null,
  url: getUrl(), // Use the helper function
  toggle: null,
  response: [],
  shift: [],
};

// Create the slice
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    // Other actions can go here
  },
});

// Export the action creators
export const { setUrl } = mainSlice.actions;

// Export the reducer
export default mainSlice.reducer;
