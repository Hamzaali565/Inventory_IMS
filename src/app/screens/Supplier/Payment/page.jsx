"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PaymentToSupplier = () => {
  const [data, setData] = useState(null);
  const [paying, setPaying] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [openPO, setOpenPO] = useState(false);
  const url = useSelector((state) => state.main.url);
  const handleOpenPO = (open) => {
    setOpenPO(open);
  };

  const supplierPayment = async () => {
    if (paying === 0) return alert("Please select a supplier to pay");
    if (paymentType === "") return alert("Please select a payment type");
    try {
      let response = await fetch(`${url}/supplier-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_type: paymentType,
          remarks: remarks,
          paying: paying,
          supplier_name: data?.supplier_name,
          supplier_id: data?.supplier_id,
          grn_no: data?.grn_no,
        }),
        credentials: "include",
      });
      response = (await response.json()).data;
      console.log("response", response);
      reset();
      alert(`Payment Created Successfully !!!`);
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
  };

  const onChangeInput = (value, key) => {
    if (key === "paying") {
      if (value > (data && data.payable - data?.payed) || value < 0) {
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
        <Heading className={"text-2xl"} text={"Payment To Supplier"} />
      </Card>

      <Card>
        <Button text={"GRN No"} onClick={(e) => setOpenPO(true)} />
        <div className="grid grid-cols-2">
          <LabInput
            label={"Total Amount"}
            placeholder={"Total Amount"}
            disabled={true}
            value={(data && data?.payable) || 0}
          />
          <LabInput
            label={"Payed Amount"}
            placeholder={"Payed Amount"}
            disabled={true}
            value={(data && data.payed) || 0}
          />
          <LabInput
            label={"Pending Payables"}
            placeholder={"Pending Payables"}
            value={(data && data.payable - data.payed) || 0}
            disabled={true}
          />
          <LabInput
            label={"Current Paying"}
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
            label={"Supplier Name"}
            placeholder={"Supplier Type"}
            value={(data && data.supplier_name) || ""}
            disabled={true}
          />
          <LabInput
            label={"GRN No"}
            placeholder={"GRN No"}
            value={(data && data.grn_no) || 0}
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
        headerCode="GRN No"
        headerName="Payment Supliers Name"
        headerStatus="Pending Amount"
        placeholder="Search"
        onClick={(data_recieve) => setData(data_recieve)}
      />
    </div>
  );
};

export default PaymentToSupplier;
