"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CashReport = () => {
  const [data, setData] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [openSupplier, setOpenSupplier] = useState(false);
  const [supplier, setSupplier] = useState(null);
  const url = useSelector((state) => state.main.url);

  const reset = () => {
    setToDate("");
    setFromDate("");
    setData([]);
    setSupplier(null);
  };

  const handleOpenSupplier = (open) => {
    setOpenSupplier(open);
  };

  const credit_costumer_details = async () => {
    try {
      let response = await fetch(
        `${url}/cash-report?fromDate=${fromDate}&toDate=${toDate}`,
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
      console.log("response ", response);
    } catch (error) {
      console.log("Error of get grn");
    }
  };

  return (
    <div>
      <Card>
        <Heading text={"Cash Report"} className={"mt-4 p-2 text-2xl"} />
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
        {data.length !== 0 && (
          <div>
            <div className="flex w-[100%] border-2 font-bold text-lg">
              <p className="w-[15%] text-center border-r-2">Total Sale</p>
              <p className="w-[15%] text-center border-r-2">Total Expense</p>
              <p className="w-[15%] text-center border-r-2">Receive Amount</p>
              <p className="w-[15%] text-center border-r-2">Total Purchasing</p>
              <p className="w-[15%] text-center border-r-2">Total Refund</p>
              <p className="w-[10%] text-center border-r-2">Other Expense</p>
              <p className="w-[15%] text-center border-r-2">Pay To Supplier</p>
            </div>

            <div className="flex w-[100%] border-2 text-lg">
              <p className="w-[15%] text-center border-r-2">
                {data[1].total_sale}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {data[1].total_expense}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {data[1].total_receive}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {data[0].total_purchasing}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {data[2].total_refund}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {data[4].other_expense}
              </p>
              <p className="w-[15%] text-center border-r-2">
                {data[3].total_payment_to_supplier}
              </p>
            </div>
          </div>
        )}
      </Card>
      <Modal
        isOpen={openSupplier}
        onOpenChange={handleOpenSupplier}
        headerCode="Supplier Code"
        headerName="Supplier Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => setSupplier(data)}
      />
    </div>
  );
};

export default CashReport;
