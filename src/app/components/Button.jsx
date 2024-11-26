import React from "react";

const Button = ({ onClick, text, className, classNameText }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-2 w-20 text-center cursor-pointer hover:bg-white/5 ${classNameText}`}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export { Button };
