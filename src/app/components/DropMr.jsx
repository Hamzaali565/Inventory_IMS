import React from "react";

const DropMr = ({ DropDownLabel, data, onChange, onClick }) => {
  const handleChange = (event) => {
    const selectedName = event.target.value;
    onChange(selectedName);
  };
  return (
    <div className=" items-center">
      <label for="cars" className="font-bold underline">
        {DropDownLabel}
      </label>

      <select
        name="cars"
        id="cars"
        className="p-1 rounded-2xl bg-gray-800 bg-opacity-5 backdrop-blur-lg border  border-opacity-30 shadow-lg w-16 md:w-24"
        onChange={handleChange}
        onClick={onClick}
      >
        {data &&
          data.map((item, index) => (
            <option
              value={item?.name}
              key={index}
              className="text-sm  bg-black"
            >
              {item?.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropMr;
