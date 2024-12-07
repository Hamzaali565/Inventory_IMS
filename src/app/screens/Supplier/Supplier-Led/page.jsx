"use client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SupplierLed = () => {
  const [data, setData] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const reset = () => {
    setToDate("");
    setFromDate("");
    setData([]);
  };
  const url = useSelector((state) => state.main.url);
  //   useEffect(() => {
  //     curren_stock();
  //   });

  const prev_stock = async () => {
    try {
      let response = await fetch(
        `${url}//supplier-ledger?fromDate=${fromDate}&toDate=${toDate}`,
        { credentials: "include" }
      );
      response = (await response.json()).data?.data;
      console.log("response", response);

      let groupedData = [];
      response.forEach(({ supplier_name, ...rest }) => {
        if (!groupedData[supplier_name]) {
          groupedData[supplier_name] = [];
        }
        groupedData[supplier_name].push({ ...rest, supplier_name });
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
        <Heading text={"Supplier Ledger"} className={"mt-4 p-2 text-2xl"} />

        <div>
          <LabInput
            label={"From-date"}
            type={"Date"}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <LabInput
            label={"To-date"}
            type={"Date"}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center space-x-3 my-3 pb-2">
          <Button text={"Load"} onClick={() => prev_stock()} />
          <Button text={"Reset"} onClick={() => reset()} />
        </div>
      </Card>
      <Card className={"mt-3 p-2"}>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="mt-2 border-2" key={index}>
              <p className="text-center text-lg bg-yellow-500 text-black font-bold">
                {items[0]?.supplier_name}
              </p>

              <div className="flex w-[100%]">
                <p className="w-[15%] text-center border-2 border-r-0 border-l-0">
                  Serial No
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">
                  GRN No
                </p>
                <p className="w-[20%] text-center border-2 border-r-0">
                  Total Payables
                </p>
                <p className="w-[10%] text-center border-2 border-r-0">
                  Total Payed
                </p>
                <p className="w-[10%] text-center border-2 border-r-0">
                  Pending
                </p>
                <p className="w-[15%] text-center border-2 border-r-0">User</p>
                <p className="w-[15%] text-center border-2 border-r-0">Date</p>
              </div>
              {items.length !== 0 &&
                items.map((nestedItem, nestedIndex) => (
                  <div className="flex w-[100%]" key={nestedIndex}>
                    <p className="w-[15%] text-center border-2 border-r-0 border-l-0 border-t-0">
                      {nestedIndex + 1}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0 ">
                      {nestedItem?.grn_no}
                    </p>
                    <p className="w-[20%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.payable}
                    </p>
                    <p className="w-[10%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.payed}
                    </p>
                    <p className="w-[10%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.payable - nestedItem?.payed}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0">
                      {nestedItem?.c_user}
                    </p>
                    <p className="w-[15%] text-center border-2 border-r-0 border-t-0">
                      {moment(nestedItem?.c_date).format("DD/MM/YYYY HH:MM:SS")}
                    </p>
                  </div>
                ))}
              <p className="text-right mr-10 text-green-500 ">
                Total Payables{" "}
                {items
                  .reduce(
                    (total, item) => total + (item.payable - item.payed),
                    0
                  )
                  .toLocaleString()}
              </p>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default SupplierLed;
