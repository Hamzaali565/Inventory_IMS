import React from "react";
import DropMr from "./DropMr";

const LabelledDropDown = ({ data, label, onChange }) => {
  return (
    <div className="w-52 grid grid-cols-[10rem,auto] gap-x-2 items-center">
      <p className="text-sm">{label}:</p>
      <DropMr data={data} onChange={onChange} />
    </div>
  );
};

export default LabelledDropDown;
