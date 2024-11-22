import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string; // Optional: To allow additional styles
}

const Card: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={` bg-white/10 backdrop-blur-lg rounded-lg shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export { Card };
