"use client";

import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CStock = () => {
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.main.url);
  useEffect(() => {
    curren_stock();
  });

  const curren_stock = async () => {
    try {
      let response = await fetch(`${url}/stock`, { credentials: "include" });
      response = (await response.json()).data?.data;
      console.log("response", response);

      let groupedData = [];
      response.forEach(({ item_name, ...rest }) => {
        if (!groupedData[item_name]) {
          groupedData[item_name] = [];
        }
        groupedData[item_name].push({ ...rest, item_name });
      });

      let formattedData = Object.values(groupedData);
      setData(formattedData);
      console.log("formattedData", formattedData);
    } catch (error) {
      console.log("error of current_stock", error);
    }
  };
  return (
    <div>
      <Card>
        <Heading text={"Current Stock"} className={"mt-4 p-2 text-2xl"} />
      </Card>
      <Card className={"mt-3 p-2"}>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="mt-2 border-2 border-b-0" key={index}>
              <p className="text-center text-lg">{items[0]?.item_name}</p>

              <div className="flex w-[100%]">
                <p className="w-[15%] text-center border-2 border-r-0 border-l-0">
                  Batch No
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">
                  GRN No
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">
                  Input Type
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">
                  Pack Size Status
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">
                  Pack Size Quantity
                </p>
                <p className="w-[10%] text-center border-2 border-r-0">
                  Availaible Stock
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">
                  Created User
                </p>
              </div>
              {items.length !== 0 &&
                items.map((nestedItem, nestedIndex) => (
                  <div className="flex w-[100%]" key={nestedIndex}>
                    <p className="w-[15%] text-center border-2 border-r-0 border-l-0 border-t-0">
                      {nestedItem?.batch_no}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0 ">
                      {nestedItem?.grn_no}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.input_type}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.p_size_status}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.p_size_qty}
                    </p>
                    <p className="w-[10%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.p_size_stock}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.c_user}
                    </p>
                  </div>
                ))}
            </div>
          ))}
      </Card>
    </div>
  );
};

export default CStock;
