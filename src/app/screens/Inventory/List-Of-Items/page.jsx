"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import moment from "moment/moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListOfItems = () => {
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
      let response = await fetch(`${url}/item`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      response = (await response.json()).data.data;
      setData(response);
      console.log("response ", response);
    } catch (error) {
      console.log("Error of credit details");
    }
  };

  return (
    <div>
      <Card>
        <Heading text={"List of Items"} className={"mt-4 p-2 text-2xl"} />

        <div className="flex justify-center space-x-3 my-3 pb-2">
          <Button text={"Load"} onClick={() => credit_costumer_details()} />
          <Button text={"Reset"} onClick={() => reset()} />
        </div>
      </Card>

      <Card className={"p-2"}>
        <div className="flex w-[100%] border-2 font-bold text-lg">
          <p className="w-[10%] text-center border-r-2">Code</p>
          <p className="w-[20%] text-center border-r-2">Item Name</p>
          <p className="w-[10%] text-center border-r-2">Unit</p>
          <p className="w-[10%] text-center border-r-2">Category</p>
          <p className="w-[10%] text-center border-r-2">Pack Size</p>
          <p className="w-[10%] text-center border-r-2">Purchase Price</p>
          <p className="w-[10%] text-center border-r-2">Sale Price</p>
          <p className="w-[10%] text-center border-r-2">User</p>
          <p className="w-[10%] text-center border-r-2">Date</p>
        </div>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="flex w-[100%] border-2 border-t-0" key={index}>
              <p className="w-[10%] text-center border-r-2">{items?.item_id}</p>
              <p className="w-[20%] text-center border-r-2">
                {items?.item_name}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.item_unit}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.category}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.p_size_status}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.p_size_status === 1
                  ? items?.p_price_per_size
                  : items?.p_price}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.p_size_status === 1
                  ? items?.s_price_per_size
                  : items?.s_price}
              </p>
              <p className="w-[10%] text-center border-r-2">{items?.c_user}</p>
              <p className="w-[10%] text-center">
                {items?.c_at
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

export default ListOfItems;
