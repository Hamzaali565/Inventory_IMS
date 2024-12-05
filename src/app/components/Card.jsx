"use client";
import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={` bg-white/10 backdrop-blur-lg rounded-lg shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export { Card };
