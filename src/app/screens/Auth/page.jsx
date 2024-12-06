"use client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import logo from "../../../../public/Images/signature.png";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLoginData } from "@/store/acrion";
import { setLogin } from "@/store/reducer";

const Login = () => {
  const [user_id, setUserId] = useState("");
  const [cred, setCred] = useState("");

  const url = useSelector((state) => state.main.url);
  const dispatch = useDispatch();
  const submitDetails = async () => {
    try {
      if (user_id === "") {
        alert("Please enter your user id");
        return;
      } else if (cred === "") {
        alert("Please enter your password");
        return;
      }
      const response = await fetch(`${url}/login`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, cred }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response?.status);
      }
      const data = (await response.json()).data.data;
      dispatch(setLoginData(data));
      dispatch(setLogin(true));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="lg:flex lg:justify-around lg:h-screen lg:items-center">
      {/* image */}
      <div className="flex justify-center flex-1 lg:w-56">
        <Image src={logo} alt="Madni Cosmetics" className="w-full" />
      </div>
      {/* Card */}
      <div className="lg:flex-1 ">
        <Card className="mt-6 m-2 lg:mt-0 lg:h-96 lg:flex lg:flex-col lg:justify-center">
          <Heading text="Welcome Back!" className="p-2 lg:text-2xl underline" />
          <LabInput
            label="User Id"
            type="text"
            placeholder="Enter your user id"
            onChange={(e) => setUserId(e.target.value)}
            mainStyle="p-2 justify-center space-x-4"
          />
          <LabInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setCred(e.target.value)}
            mainStyle="p-2 justify-center space-x-4 "
          />
          <p className="my-3 cursor-pointer text-center text-xs underline text-blue-800 hover:text-blue-400">
            Forget password? Contact to Hamza
          </p>
          <Button
            className="p-2"
            onClick={() => submitDetails()}
            text="Login"
          />
        </Card>
      </div>
    </div>
  );
};

export { Login };
