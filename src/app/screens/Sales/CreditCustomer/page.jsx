"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CreditCustomer = () => {
  const [data, setData] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const url = useSelector((state) => state.main.url);

  const reset = () => {
    setToDate("");
    setFromDate("");
    setData([]);
  };

  const credit_costumer_details = async () => {
    try {
      let response = await fetch(
        `${url}/credit-costumers?fromDate=${fromDate}&toDate=${toDate}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      response = (await response.json()).data.data;
      setData(response);
    } catch (error) {
      console.log("Error of credit details");
    }
  };

  return (
    <div>
      <Card>
        <Heading text={"Credit Customers"} className={"mt-4 p-2 text-2xl"} />

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
          <Button text={"Load"} onClick={() => credit_costumer_details()} />
          <Button text={"Reset"} onClick={() => reset()} />
        </div>
      </Card>

      <Card className={"p-2"}>
        <div className="flex w-[100%] border-2 font-bold text-lg">
          <p className="w-[10%] text-center border-r-2">Invoice No</p>
          <p className="w-[20%] text-center border-r-2">Customer name</p>
          <p className="w-[15%] text-center border-r-2">Total Amount</p>
          <p className="w-[10%] text-center border-r-2">Receive Amount</p>
          <p className="w-[15%] text-center border-r-2">Pending Amount</p>
          <p className="w-[15%] text-center border-r-2">User</p>
          <p className="w-[15%] text-center">Date</p>
        </div>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="flex w-[100%] border-2 mt-1" key={index}>
              <p className="w-[10%] text-center border-r-2">{items?.id}</p>
              <p className="w-[20%] text-center border-r-2">
                {items?.costumer_name}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {items?.total_charges}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.r_amount}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {(items?.total_charges - items?.r_amount).toFixed(2)}
              </p>
              <p className="w-[15%] text-center border-r-2">{items?.c_user}</p>
              <p className="w-[15%] text-center">
                {items?.c_date
                  ? moment(items?.c_date).format("DD/MM/YYYY HH:mm:ss")
                  : ""}
              </p>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default CreditCustomer;
