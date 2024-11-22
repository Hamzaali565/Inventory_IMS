import React from "react";

interface headProps {
  text: string;
  className?: string;
}

const Heading: React.FC<headProps> = ({ text, className }) => {
  return <div className={`font-bold text-center ${className}`}>{text}</div>;
};

export default Heading;
