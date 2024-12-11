"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListOfPayments = () => {
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
        `${url}/supplier-payment-record?fromDate=${fromDate}&toDate=${toDate}&supplier_id=${
          (supplier && supplier?.code) || +0
        }`,
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
        <Heading text={"List of Payments"} className={"mt-4 p-2 text-2xl"} />

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
        <div className="flex justify-center space-x-3">
          <Button
            text={"Supplier Name"}
            classNameText={"w-40"}
            onClick={() => setOpenSupplier(true)}
          />
          <LabInput
            disabled={true}
            placeholder={"Supplier Name"}
            value={(supplier && supplier?.name) || ""}
          />
        </div>
        <div className="flex justify-center space-x-3 my-3 pb-2">
          <Button text={"Load"} onClick={() => credit_costumer_details()} />
          <Button text={"Reset"} onClick={() => reset()} />
        </div>
      </Card>

      <Card className={"p-2"}>
        <div className="flex w-[100%] border-2 font-bold text-lg">
          <p className="w-[10%] text-center border-r-2">Payment No</p>
          <p className="w-[10%] text-center border-r-2">GRN/Invoice No</p>
          <p className="w-[20%] text-center border-r-2">Supplier name</p>
          <p className="w-[20%] text-center border-r-2">Remarks</p>
          <p className="w-[10%] text-center border-r-2">Amount Payed</p>
          <p className="w-[15%] text-center border-r-2">User</p>
          <p className="w-[15%] text-center border-r-2">Date</p>
        </div>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="flex w-[100%] border-2 mt-1" key={index}>
              <p className="w-[10%] text-center border-r-2">{items?.id}</p>
              <p className="w-[10%] text-center border-r-2">
                {items?.grn_no !== 0 ? items?.grn_no : items?.invoice_no}
              </p>
              <p className="w-[20%] text-center border-r-2">
                {items?.supplier_name}
              </p>
              <p className="w-[20%] text-center border-r-2">{items?.remarks}</p>
              <p className="w-[10%] text-center border-r-2">{items?.amount}</p>
              <p className="w-[15%] text-center border-r-2">{items?.c_user}</p>
              <p className="w-[15%] text-center">
                {items?.c_date
                  ? moment(items?.c_date).format("DD/MM/YYYY HH:mm:ss")
                  : ""}
              </p>
            </div>
          ))}
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

export default ListOfPayments;
