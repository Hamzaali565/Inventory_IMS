import { createSlice } from "@reduxjs/toolkit";

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
  login: false,
  url: getUrl(), // Use the helper function
  response: [],
};

// Create the slice
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload; // Update login status
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    // Other actions can go here
    setLoginData: (state, action) => {
      state.response = action.payload; // Store the login data in response
    },
  },
});

// Export the action creators
export const { setUrl, setLoginData, setLogin } = mainSlice.actions;

// Export the reducer
export default mainSlice.reducer;
