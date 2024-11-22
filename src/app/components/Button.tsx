import React from "react";

interface Button {
  text: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Button: React.FC<Button> = ({ onClick, text, className }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-2 w-20 text-center cursor-pointer hover:bg-white/5`}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export { Button };
