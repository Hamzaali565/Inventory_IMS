"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ReceiveCreditAmount = () => {
  const [data, setData] = useState(null);
  const [paying, setPaying] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [customerName, setCustomerName] = useState("No Name");
  const [openPO, setOpenPO] = useState(false);
  const url = useSelector((state) => state.main.url);
  const handleOpenPO = (open) => {
    setOpenPO(open);
  };

  const supplierPayment = async () => {
    if (paying === 0)
      return alert("Please enter current receiving amount !!! ");
    if (paymentType === "") return alert("Please enter payment type !!!");
    try {
      let response = await fetch(`${url}/create_clearance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_type: paymentType,
          remarks: remarks,
          paying: paying,
          costumer_name: data?.costumer_name
            ? data?.costumer_name
            : customerName,
          id: data?.id,
        }),
        credentials: "include",
      });
      response = (await response.json()).data;
      console.log("response", response);
      reset();
      alert(`Clearance Created Successfully !!!`);
    } catch (error) {
      console.log("Supplier payment error", error);
      alert(`Payment Creation Failed !!!`);
    }
  };

  const reset = () => {
    setData(null);
    setPaymentType("");
    setPaying(0);
    setRemarks("");
    setCustomerName("");
  };

  const onChangeInput = (value, key) => {
    if (key === "paying") {
      if (value > data.difference || value < 0) {
        alert(
          "Paying amount should not be greater than pending amount or less than zero !!!"
        );
        return;
      } else {
        setPaying(value);
      }
    }
  };

  return (
    <div>
      <Card className={"mt-2 p-2"}>
        <Heading className={"text-2xl"} text={"Credit Receive and Clearance"} />
      </Card>

      <Card>
        <div className="flex justify-center space-x-3">
          <Button
            text={"Invoice No"}
            classNameText={""}
            onClick={(e) => setOpenPO(true)}
          />
          <Button text={"CC No"} onClick={(e) => setOpenPO(true)} />
        </div>
        <div className="grid grid-cols-2">
          <LabInput
            label={"Total Amount"}
            placeholder={"Total Amount"}
            disabled={true}
            value={(data && data?.total_charges) || 0}
          />
          <LabInput
            label={"Payed Amount"}
            placeholder={"Payed Amount"}
            disabled={true}
            value={(data && data?.r_amount) || 0}
          />
          <LabInput
            label={"Pending Payables"}
            placeholder={"Pending Payables"}
            value={(data && data.difference) || 0}
            disabled={true}
          />
          <LabInput
            label={"Current Receiving"}
            placeholder={"Current Paying"}
            onChange={(e) => onChangeInput(+e.target.value, "paying")}
            value={paying}
            disabled={data ? false : true}
            type={"number"}
          />
          <LabInput
            label={"Payment Type"}
            placeholder={"Payment Type"}
            onChange={(e) => setPaymentType(e.target.value.toUpperCase())}
            value={paymentType}
            disabled={data ? false : true}
          />
          <LabInput
            label={"Remarks"}
            placeholder={"Remarks"}
            onChange={(e) => setRemarks(e.target.value.toUpperCase())}
            value={remarks}
            disabled={data ? false : true}
          />
          <LabInput
            label={"Customer Name"}
            placeholder={"Customer Name"}
            value={(data && data.costumer_name) || customerName}
            disabled={data?.costumer_name ? true : false}
            onChange={(e) => setCustomerName(e.target.value.toUpperCase())}
          />
          <LabInput
            label={"Invoice No"}
            placeholder={"Invoice No"}
            value={(data && data.id) || 0}
            disabled={true}
          />
        </div>
        <div className="flex justify-center space-x-4 p-2">
          {data && <Button text={"Save"} onClick={supplierPayment} />}
          <Button text={"Reset"} onClick={reset} />
        </div>
      </Card>

      <Modal
        isOpen={openPO}
        onOpenChange={handleOpenPO}
        headerCode="Invoice No."
        headerName="Customer Name"
        headerStatus="Pending Amount"
        placeholder="Search"
        onClick={(data_recieve) => setData(data_recieve)}
      />
    </div>
  );
};

export default ReceiveCreditAmount;
