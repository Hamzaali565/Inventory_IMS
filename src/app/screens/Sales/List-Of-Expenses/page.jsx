"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Loader from "@/app/components/Loader";
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListOfOtherExpenses = () => {
  const [data, setData] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [open, setOpen] = useState(false);
  const url = useSelector((state) => state.main.url);

  const reset = () => {
    setToDate("");
    setFromDate("");
    setData([]);
  };

  const credit_costumer_details = async () => {
    try {
      setOpen(true);
      let response = await fetch(
        `${url}/all-expense?fromDate=${fromDate}&toDate=${toDate}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      response = (await response.json()).data.data;
      console.log(response);

      setData(response);
      setOpen(false);
    } catch (error) {
      console.log("Error of credit details");
      setOpen(false);
      setData([]);
    }
  };

  return (
    <div>
      <Card>
        <Heading
          text={"List Of Other Expenses"}
          className={"mt-4 p-2 text-2xl"}
        />

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
          <p className="w-[10%] text-center border-r-2">Expense No</p>
          <p className="w-[25%] text-center border-r-2">Expense Type</p>
          <p className="w-[20%] text-center border-r-2">Remarks</p>
          <p className="w-[15%] text-center border-r-2">Amount</p>
          <p className="w-[15%] text-center border-r-2">User</p>
          <p className="w-[15%] text-center">Date</p>
        </div>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="flex w-[100%] border-2 mt-1" key={index}>
              <p className="w-[10%] text-center border-r-2">{items?.id}</p>
              <p className="w-[25%] text-center border-r-2">
                {items?.expenseType}
              </p>
              <p className="w-[20%] text-center border-r-2">{items?.remarks}</p>
              <p className="w-[15%] text-center border-r-2">{items?.amount}</p>
              <p className="w-[15%] text-center border-r-2">{items?.c_user}</p>
              <p className="w-[15%] text-center">
                {items?.c_date
                  ? moment(items?.c_date).format("DD/MM/YYYY HH:mm:ss")
                  : ""}
              </p>
            </div>
          ))}
      </Card>
      <Loader visible={open} />
    </div>
  );
};

export default ListOfOtherExpenses;
