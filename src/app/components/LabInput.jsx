"use-client";

import React from "react";

const LabInput = ({
  mainStyle,
  textStyle,
  label,
  inpStyle,
  placeholder,
  onChange,
  type,
  disabled,
  value,
  accept,
  checked,
  onKeyDown,
}) => {
  return (
    <div className=" flex justify-center">
      <div
        className={`flex items-center justify-between w-96 mt-2  ${mainStyle}`}
      >
        {label && <div className={`${textStyle}`}>{label}</div>}

        <input
          className={`bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-2 ${inpStyle}`}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          type={type}
          name=""
          id=""
          accept={accept}
          checked={checked}
          value={value}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export { LabInput };
