"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const LPAdjustment = () => {
  const [openPO, setOpenPO] = useState(false);
  const [otherDetails, setOtherDetails] = useState(null);
  const [data, setData] = useState([]);
  const [billCr, setBillCr] = useState(false);
  const [stockAdj, setStockAdj] = useState(false);
  const [supplier, setSupplier] = useState(null);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [outstandings, setOutstandings] = useState(0);

  const reset = () => {
    setOtherDetails(null);
    setData([]);
    setBillCr(false);
    setStockAdj(false);
    setSupplier(null);
    setOutstandings(0);
  };

  const handleOpenSupplier = (open) => {
    setOpenSupplier(open);
  };
  const url = useSelector((state) => state.main.url);

  const handleOpenPO = (open) => {
    setOpenPO(open);
  };

  const getDetails = async (pass_data) => {
    try {
      let response = await fetch(
        `${url}/lp-detail?invoice_no=${pass_data?.code}`,
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
      setOtherDetails(pass_data);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  const adjustmentType = (key) => {
    if (key === "bill") {
      setStockAdj(false);
      setBillCr(true);
      return;
    }
    setStockAdj(true);
    setBillCr(false);
  };

  const handleAdjustQty = (data_rec, value) => {
    let updatedData = data.map((items) => {
      if (data_rec?.item_id === items?.item_id) {
        if (value > items?.d_qty || value < 0) {
          alert(
            `Adjust quantity could not be greater then dispense quantity or less than zero`
          );
          return items;
        }
        return { ...items, a_qty: +value };
      }
      return items;
    });
    setData(updatedData);
  };

  const submitBillCr = async () => {
    try {
      if (!supplier) throw new Error("Please select supplier !!!");
      if (outstandings === 0) throw new Error("Please Enter outstandings !!!");
      console.log(data);

      let response = await fetch(`${url}/create_supp_ledger_of_lp`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          supplier_name: supplier?.name,
          supplier_id: supplier?.code,
          payable: outstandings,
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response?.statusText);
      }
      response = await response.json();
      console.log("response", response);
      alert(`Supplier Ledger Created ✨✨✨`);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
        return;
      }
      alert(`Failed to create supplier ledger !!!`);
      console.log("error", error);
    }
  };

  const adjustStock = async () => {
    console.log("heelo");
  };

  const remove_row = (index_item) => {
    let update_data = data.filter((_, index) => index !== index_item);
    setData(update_data);
  };

  return (
    <div>
      <Card className={"p-2 text-lg mt-2"}>
        <Heading text={"Local Purchase Adjustment"} />
      </Card>
      <Card className={"mt-2 p-1"}>
        <Button
          text={"LP Invoices"}
          classNameText={"w-40 "}
          onClick={() => setOpenPO(true)}
        />
        <div className="grid grid-cols-2 p-2">
          <LabInput
            label={"Invoice No."}
            placeholder={"Invoice No."}
            disabled={"true"}
            value={(otherDetails && otherDetails?.code) || ""}
          />

          <LabInput
            label={"Dispence Quantity"}
            placeholder={"Dispence Quantity"}
            disabled={"true"}
            value={(otherDetails && otherDetails?.status) || ""}
          />
          <LabInput
            label={"Customer Name"}
            placeholder={"Customer Name"}
            disabled={"true"}
            value={(otherDetails && otherDetails?.name) || ""}
          />
          <LabInput
            label={"Created user"}
            placeholder={"Created Date"}
            disabled={"true"}
            value={(data.length !== 0 && data[0]?.c_user) || ""}
          />
        </div>
        <div className="flex space-x-2 justify-center p-2">
          <Button
            text={"Adjust With Stock"}
            classNameText={`w-40 ${stockAdj === true ? "bg-blue-400" : ""}`}
            onClick={() => adjustmentType("stock")}
          />
          <Button
            text={"Create Supplier Bill"}
            classNameText={`w-40 ${billCr === true ? "bg-blue-400" : ""}`}
            onClick={() => adjustmentType("bill")}
          />
        </div>
        <Button text={"Reset"} className={"p-2"} onClick={reset} />
      </Card>
      <Card className={"mt-2 p-2"}>
        <div className="w-[100%] border-2 flex font-bold">
          <p className="w-[40%] text-center border-r-2">Item Name</p>
          <p className="w-[10%] text-center border-r-2">Item unit</p>
          <p className="w-[20%] text-center border-r-2">Dispense Quantity</p>
          <p className="w-[30%] text-center border-r-2">Adjust Quantity</p>
          <p className="w-[10%] text-center ">Remove</p>
        </div>
        {data.length !== 0 &&
          data.map((items, index) => (
            <div className="w-[100%] mt-1 border-2 flex p-1" key={index}>
              <p className="w-[40%] text-center border-r-2">
                {items?.item_name}
              </p>
              <p className="w-[10%] text-center border-r-2">
                {items?.item_unit}
              </p>
              <p className="w-[20%] text-center border-r-2">{items?.d_qty}</p>
              <p className="w-[30%] text-center border-r-2">
                <input
                  type="number"
                  name=""
                  id=""
                  className="rounded-md bg-gray-400 placeholder:text-white placeholder:text-sm placeholder:pl-2"
                  placeholder="Enter adjust quantity"
                  onChange={(e) => handleAdjustQty(items, +e.target.value)}
                  value={(billCr === true && 0) || items?.a_qty || 0}
                  disabled={billCr ? true : false}
                />
              </p>
              <p
                className="w-[10%] text-center font-bold hover:text-red-600 cursor-pointer"
                onClick={(e) => remove_row(index)}
              >
                -
              </p>
            </div>
          ))}
        {billCr && (
          <div className="p-2">
            <Button
              text={"Select Supplier"}
              classNameText={"w-40"}
              onClick={() => setOpenSupplier(true)}
            />
            <LabInput
              label={"Supplier Name"}
              placeholder={"Supplier Name"}
              disabled={true}
              value={(supplier && supplier?.name) || ""}
            />
            <LabInput
              label={"Outstandings to supplier"}
              placeholder={"Outstandings to supplier"}
              onChange={(e) => setOutstandings(+e.target.value)}
              value={outstandings}
            />
          </div>
        )}
        {data.length !== 0 && (billCr === true || stockAdj === true) && (
          <Button
            text={"Save"}
            className={"p-2"}
            onClick={billCr ? submitBillCr : adjustStock}
          />
        )}
      </Card>
      <Modal
        isOpen={openPO}
        onOpenChange={handleOpenPO}
        headerCode="Invoice No."
        headerName="Customer Names"
        headerStatus="Total Qty"
        placeholder="Search"
        onClick={(data_recieve) => getDetails(data_recieve)}
      />
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

export default LPAdjustment;
