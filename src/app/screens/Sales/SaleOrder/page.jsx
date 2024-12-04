import React, { useEffect, useRef, useCallback, useState } from "react";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
const Sales = () => {
  const [bar_code, setBarCode] = useState("");
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.main.url);

  // Ref to focus the input
  const inputRef = useRef(null);
  const errorSound = new Audio("/audio/ErrorMessage.mp3");
  // Focus the input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const callForItem = async (scan_code) => {
    try {
      console.log("Scan Code:", scan_code);
      let response = await fetch(`${url}/sales?scan_code=${scan_code}`);
      response = (await response.json())?.data?.data;
      console.log(" here with response ", response);

      data.forEach((resp) => {
        let find_duplicate = response.find(
          (item) => item?.item_id === resp?.item_id
        );
        if (find_duplicate) {
          throw new Error("Duplicate Items Not Allowed !!!");
        }
      });
      console.log("Response:", response);
      response = response.map((items) => ({
        ...items,
        d_qty: 1,
        t_qty: 0,
      }));
      console.log("data:", data);
      setData((prev) => [...prev, ...response]);
      // Clear the input after fetching
      setBarCode("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.log("Error:", error);
      setBarCode("");
      errorSound.play();
    }
  };

  const debouncedCallForItem = useCallback(
    debounce((scan_code) => {
      callForItem(scan_code);
    }, 300),
    []
  );

  const removeRow = (r_index) => {
    if (data.length === 1) {
      return;
    }
    setData((prev) => prev.filter((_, index) => index !== r_index));
  };

  const handleInputs = (value, dataObj, key) => {
    let updated_data = data.map((items) => {
      if (items?.item_id === dataObj?.item_id) {
        if (key === "s_price") {
          if (dataObj?.p_size_status === 1) {
            return {
              ...items,
              s_price_per_size: +value,
              t_qty: +value * items?.d_qty,
            };
          } else {
            return { ...items, [key]: +value, t_qty: +value * items?.d_qty };
          }
        }
        if (key === "d_qty") {
          if (dataObj?.p_size_status === 1) {
            return {
              ...items,
              [key]: +value,
              t_qty: +value * items?.s_price_per_size,
            };
          } else {
            return { ...items, [key]: +value, t_qty: +value * items?.s_price };
          }
        }
      }
      return items;
    });
    console.log("updated_data", updated_data);
    setData(updated_data);
  };

  return (
    <div>
      <Card className={"p-2 mt-2"}>
        <Heading text={"Sales Order"} />
      </Card>

      <Card className={"p-2 mt-2"}>
        <div className="flex justify-center mt-2">
          <LabInput
            label={"Scan Item"}
            placeholder={"Scan Item"}
            ref={inputRef} // Attach ref to the input
            value={bar_code} // Bind input to state
            onChange={(e) => {
              const value = e.target.value;
              setBarCode(value); // Update input state
              debouncedCallForItem(value); // Trigger debounced call
            }}
          />
        </div>
      </Card>

      <Card className={"mt-3"}>
        <div className="flex justify-between p-2">
          <p className="w-[5%] border-2 text-center border-r-0">S. No.</p>
          <p className="w-[15%] border-2 text-center border-r-0">Item Name</p>
          <p className="w-[10%] border-2 text-center border-r-0">Unit</p>
          <p className="w-[10%] border-2 text-center border-r-0">
            Pack Size Status
          </p>
          <p className="w-[5%] border-2 text-center border-r-0">Pack Size</p>
          <p className="w-[10%] border-2 text-center border-r-0">
            Purchase Per Item
          </p>
          <p className="w-[10%] border-2 text-center border-r-0">
            Sale Per Item
          </p>
          <p className="w-[10%] border-2 text-center border-r-0">Stock Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">
            Dispense Qty
          </p>
          <p className="w-[5%] border-2 text-center border-r-0">Total</p>
          <p className="w-[10%] border-2 text-center ">Rem</p>
        </div>

        {data.length !== 0 &&
          data?.map((items, index) => (
            <div className="flex justify-between mt-1" key={index}>
              <p className="w-[5%] border-2 text-center border-r-0">
                {index + 1}
              </p>
              <p
                className={`${
                  items?.p_size_status === 1 ? "text-green-600" : ""
                } w-[15%] border-2 text-center border-r-0 text-sm `}
              >
                {items?.item_name}
              </p>
              <p className="w-[10%] border-2 text-center border-r-0">
                {items?.item_unit}
              </p>
              <p className="w-[10%] border-2 text-center border-r-0">
                {items?.p_size_status === 0 ? "False" : "True"}
              </p>
              <p className="w-[5%] border-2 text-center border-r-0">
                {items?.p_size_qty}
              </p>
              <p className="w-[10%] border-2 text-center border-r-0">
                {items?.p_size_status === 0
                  ? items?.p_price
                  : items?.s_price_per_size}
              </p>
              <p className="w-[10%] border-2 text-center border-r-0">
                <input
                  type="number"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="sale price"
                  onChange={(e) =>
                    handleInputs(e.target.value, items, "s_price")
                  }
                  value={
                    items?.p_size_status === 0
                      ? items?.s_price
                      : items?.p_price_per_size
                  }
                />
              </p>
              <p className="w-[10%] border-2 text-center border-r-0">
                {items?.total_stock ? items?.total_stock : items?.batch_no}
              </p>
              <p className="w-[10%] border-2 text-center border-r-0">
                <input
                  type="number"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="Dispence qty"
                  value={items?.d_qty}
                  onChange={(e) => handleInputs(e.target.value, items, "d_qty")}
                />
              </p>
              <p className="w-[5%] border-2 text-center border-r-0">
                {items?.t_qty}
              </p>
              <p
                className="w-[10%] border-2 text-center text-sm p-1 font-bold text-red-600 cursor-pointer"
                onClick={() => removeRow(index)}
              >
                ---
              </p>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default Sales;
