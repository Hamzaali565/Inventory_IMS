import React from "react";

const Heading = ({ text, className }) => {
  return <div className={`font-bold text-center ${className}`}>{text}</div>;
};

export default Heading;
