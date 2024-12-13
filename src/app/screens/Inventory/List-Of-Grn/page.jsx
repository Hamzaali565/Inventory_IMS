"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListOfGrn = () => {
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
        `${url}/all-grn?fromDate=${fromDate}&toDate=${toDate}`,
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
        <Heading text={"List of GRN"} className={"mt-4 p-2 text-2xl"} />
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
          <p className="w-[10%] text-center border-r-2">GRN No</p>
          <p className="w-[30%] text-center border-r-2">Supplier Name</p>
          <p className="w-[20%] text-center border-r-2">Location</p>
          <p className="w-[15%] text-center border-r-2">User</p>
          <p className="w-[15%] text-center border-r-2">Date</p>
          <p className="w-[10%] text-center border-r-2">Detail</p>
        </div>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="flex w-[100%] border-2 border-t-0" key={index}>
              <p className="w-[10%] text-center border-r-2">{items?.grn_no}</p>
              <p className="w-[30%] text-center border-r-2">
                {items?.supplier_name}
              </p>
              <p className="w-[20%] text-center border-r-2">
                {items?.location}
              </p>
              <p className="w-[15%] text-center border-r-2">{items?.c_user}</p>
              <p className="w-[15%] text-center border-r-2">
                {items?.c_date
                  ? moment(items?.c_date).format("DD/MM/YYYY HH:mm:ss")
                  : ""}
              </p>
              <p className="w-[10%] text-center font-bold underline hover:text-blue-600 cursor-pointer">
                View
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

export default ListOfGrn;
