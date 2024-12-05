import React, { useEffect, useRef, useCallback, useState } from "react";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { Button } from "@/app/components/Button";
const Sales = () => {
  const [bar_code, setBarCode] = useState("");
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.main.url);
  const [focus, setFocus] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [message, setMessage] = useState("");
  // Ref to focus the input
  const inputRef = useRef(null);
  const errorSound = new Audio("/audio/ErrorMessage.mp3");
  // Focus the input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [focus]);

  useEffect(() => {
    console.log("Data reset or updated:", data);

    checkTotal();
  }, [data]);

  const callForItem = async (scan_code) => {
    try {
      console.log("Scan Code:", scan_code);

      let response = await fetch(`${url}/sales?scan_code=${scan_code}`);
      response = (await response.json())?.data?.data;
      console.log("response", response);

      // Initialize `d_qty` and `t_price`
      const newItems = response.map((item) => ({
        ...item,
        d_qty: 1,
        t_price:
          item?.p_size_status === 0
            ? +item.s_price * (+item?.d_qty ? +item?.d_qty + 1 : 1)
            : +item.s_price_per_size * (+item?.d_qty ? +item?.d_qty + 1 : 1),
      }));

      // Check for duplicates
      setData((prev) => {
        const updatedData = prev.map((item) => {
          if (item?.d_qty === item?.total_stock) return item;
          return newItems.find((newItem) => newItem.item_id === item.item_id)
            ? {
                ...item,
                d_qty:
                  item.d_qty === item?.total_stock
                    ? item.d_qty
                    : item.d_qty + 1,
                t_price:
                  item?.p_size_status === 0
                    ? (
                        +item.s_price * (+item?.d_qty ? +item?.d_qty + 1 : 1)
                      ).toFixed(2)
                    : (
                        +item.s_price_per_size *
                        (+item?.d_qty ? +item?.d_qty + 1 : 1)
                      ).toFixed(2),
              }
            : item;
        });

        // Append non-duplicate items
        const uniqueItems = newItems.filter(
          (newItem) => !prev.some((item) => item.item_id === newItem.item_id)
        );

        return [...updatedData, ...uniqueItems];
      });

      // Clear the input
      setBarCode("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error("Error:", error);
      setBarCode("");
      errorSound.play();
    }
  };

  // const callForItem = async (scan_code) => {
  //   try {
  //     console.log("Scan Code:", scan_code);

  //     let response = await fetch(`${url}/sales?scan_code=${scan_code}`);
  //     response = (await response.json())?.data?.data;
  //     console.log("response", response);

  //     // Initialize `d_qty` and `t_price`
  //     const newItems = response
  //       .map((item) => ({
  //         ...item,
  //         d_qty: 1,
  //         t_price:
  //           item?.p_size_status === 0
  //             ? +item.s_price * (+item?.d_qty ? +item?.d_qty + 1 : 1)
  //             : +item.s_price_per_size * (+item?.d_qty ? +item?.d_qty + 1 : 1),
  //       }))
  //       .filter((item) => !(item.batch_no !== "Loc_P" && item.p_size_stock === item.d_qty)); // Filter items

  //     // Check for duplicates
  //     setData((prev) => {
  //       const updatedData = prev.map((item) =>
  //         newItems.find((newItem) => newItem.item_id === item.item_id)
  //           ? {
  //               ...item,
  //               d_qty: item.d_qty + 1,
  //               t_price:
  //                 item?.p_size_status === 0
  //                   ? (
  //                       +item.s_price * (+item?.d_qty ? +item?.d_qty + 1 : 1)
  //                     ).toFixed(2)
  //                   : (
  //                       +item.s_price_per_size *
  //                       (+item?.d_qty ? +item?.d_qty + 1 : 1)
  //                     ).toFixed(2),
  //             }
  //           : item
  //       );

  //       // Append non-duplicate items
  //       const uniqueItems = newItems.filter(
  //         (newItem) => !prev.some((item) => item.item_id === newItem.item_id)
  //       );

  //       return [...updatedData, ...uniqueItems];
  //     });

  //     // Clear the input
  //     setBarCode("");
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setBarCode("");
  //     errorSound.play();
  //   }
  // };

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
      console.log("items", items);
      if (items?.item_id === dataObj?.item_id) {
        if (key === "s_price") {
          if (dataObj?.p_size_status === 1) {
            return {
              ...items,
              s_price_per_size: +value,
              t_price: (+value * +items?.d_qty).toFixed(2),
            };
          } else {
            return {
              ...items,
              [key]: +value,
              t_price: (+value * +items?.d_qty).toFixed(2),
            };
          }
        }
        if (key === "d_qty") {
          console.log(items?.total_stock);

          if (value > items?.total_stock) {
            return items;
          }
          if (dataObj?.p_size_status === 1) {
            return {
              ...items,
              [key]: +value,
              t_price: (+value * +items?.s_price_per_size).toFixed(2),
            };
          } else {
            return {
              ...items,
              [key]: +value,
              t_price: (+value * +items?.s_price).toFixed(2),
            };
          }
        }
      }
      return items;
    });
    console.log("updated_data", updated_data);
    setData(updated_data);
  };

  const checkTotal = () => {
    let dataSummary = data.map((items) => ({
      t_price: +items?.t_price,
      p_price:
        items?.p_size_status === 1
          ? items?.d_qty !== ""
            ? +items?.p_price_per_size * items?.d_qty
            : +items?.p_price_per_size
          : items?.d_qty !== ""
          ? +items?.p_price * items?.d_qty
          : +items?.p_price,
      s_price:
        items?.p_size_status === 1 ? +items?.s_price_per_size : +items?.s_price,
    }));

    const total = dataSummary.reduce(
      (acc, item) => acc + parseFloat(+item.t_price || 0),
      0
    );
    const totalExpense = dataSummary.reduce(
      (acc, item) => acc + parseFloat(+item.p_price || 0),
      0
    );

    setTotalPrice(total);
    setTotalPurchase(totalExpense);
  };

  const handleData = async () => {
    try {
      const response = await fetch(`${url}/sales`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, totalPrice, totalPurchase }),
      });
      let newResponse = (await response.json()).data;
      setMessage(newResponse);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setData([]);
    setTotalPrice(0);
    setTotalPurchase(0);
    setFocus(!focus);
  };

  return (
    <div>
      <Card className={"p-2 mt-2"}>
        <Heading text={"Sales Order"} />
      </Card>

      <Card className={"p-2 mt-2"}>
        <div className="flex justify-center mt-2 flex-col items-center">
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
          <p className="font bold mt-3 underline ">{message}</p>
        </div>
        <div className="flex justify-center space-x-3 mt-4">
          <Button text={"Save"} onClick={handleData} />
          <Button text={"reset"} onClick={() => reset()} />
        </div>
      </Card>

      <Card className={"mt-3 p-2"}>
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
                  : items?.p_price_per_size}
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
                      : items?.s_price_per_size
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
                {items?.t_price}
              </p>
              <p
                className="w-[10%] border-2 text-center text-sm p-1 font-bold text-red-600 cursor-pointer"
                onClick={() => removeRow(index)}
              >
                ---
              </p>
            </div>
          ))}
        {data.length !== 0 && (
          <div className="mt-3 flex flex-col items-end">
            <div className="border-2 w-72 flex border-b-0 text-center">
              <p className="border-r-2 w-[50%]">Total Recievable</p>
              <p className="w-[50%]">{totalPrice.toFixed(3)}</p>
            </div>
            <div className="border-2 w-72 flex  text-center">
              <p className="border-r-2 border-t-0 w-[50%]">Total Puchase</p>
              <p className="w-[50%]">{totalPurchase.toFixed(3)}</p>
            </div>
            <div className="border-2 w-72 flex border-t-0 text-center">
              <p className="border-r-2 w-[50%]">Total Profit</p>
              <p className="w-[50%]">
                {(totalPrice - totalPurchase).toFixed(3)}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Sales;