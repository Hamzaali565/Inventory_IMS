"use client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import logo from "../../../../public/Images/signature.png";
import React from "react";
import Image from "next/image";

const Login = () => {
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
            onChange={(e) => console.log("hello", e.target.value)}
            mainStyle="p-2 justify-center space-x-4"
          />
          <LabInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => console.log("hello", e.target.value)}
            mainStyle="p-2 justify-center space-x-4 "
          />
          <p className="my-3 cursor-pointer text-center text-xs underline text-blue-600">
            Forget password? Contact to Hamza
          </p>
          <Button
            className="p-2"
            onClick={() => console.log("hello")}
            text="Login"
          />
        </Card>
      </div>
    </div>
  );
};

export { Login };
