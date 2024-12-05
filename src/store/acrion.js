"use client";

import { BASE_URL } from "./actionType";

export const baseurl = () => ({
  type: BASE_URL,
});

export const setLoginData = (data) => ({
  type: "SET_LOGIN_DATA",
  payload: data,
});
