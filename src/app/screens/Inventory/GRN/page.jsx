"use-client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const GRN = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [location, setLocation] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [grn_date, setGrnDate] = useState("");
  const [bill_no, setBillNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [po_no, setPoNo] = useState("");
  const [data, setData] = useState([
    {
      item_id: 0,
      item_name: "",
      unit_id: 0,
      item_unit: "",
      t_qty: 0,
      r_qty: 0,
      p_qty: 0,
      charges: 0,
      amount: 0,
      p_size_status: false,
      p_size_qty: 0,
      po_no: 0,
      batch_no: "",
      batch_qty: 0,
      p_size_stock: 0,
    },
  ]);
  const [details, setDetails] = useState([]);
  const url = useSelector((state) => state.main.url);

  const handleOpenLocaion = (open) => {
    setOpenLocation(open);
  };

  const handleOpenSupplier = (open) => {
    setOpenSupplier(open);
  };

  const handleOpenPO = (open) => {
    setOpenPO(open);
  };

  const update_details = (data, key) => {
    if (key === "location") {
      setLocation(data);
      return;
    } else {
      setSupplier(data);
    }
  };

  const get_authentic_po = async (value) => {
    try {
      const response = await fetch(
        `${url}/purchase_order_sorted?po_no=${value?.po_no}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let dataRes = (await response.json()).data.data;
      console.log("data", dataRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card>
        <Heading text={"Good Receipt Note"} className={"mt-2 text-2xl p-2"} />
      </Card>
      <Card className={"grid grid-cols-3 mt-2 p-2"}>
        <Button
          text={"Select PO"}
          classNameText={"w-40"}
          onClick={() => setOpenPO(true)}
        />
        <Button
          text={"Select Supplier"}
          classNameText={"w-40"}
          onClick={() => setOpenSupplier(true)}
        />
        <Button
          text={"Select Location"}
          classNameText={"w-40"}
          onClick={() => setOpenLocation(true)}
        />
        <LabInput placeholder={"PO Number"} disabled={true} />
        <LabInput
          placeholder={"Supplier Name"}
          disabled={true}
          value={supplier?.name || ""}
        />
        <LabInput
          placeholder={"Location"}
          disabled={true}
          value={location?.name || ""}
        />
        <LabInput placeholder={"Bill No"} />
        <LabInput placeholder={"Bill Date"} type={"Date"} />
        <LabInput placeholder={"Remarks"} />
      </Card>

      <Card className={"mt-3"}>
        <div className="flex justify-between p-2">
          <p className="w-[5%] border-2 text-center border-r-0">Po No</p>
          <p className="w-[15%] border-2 text-center border-r-0">Item</p>
          <p className="w-[10%] border-2 text-center border-r-0">Unit</p>
          <p className="w-[10%] border-2 text-center border-r-0">
            Required Qty
          </p>
          <p className="w-[10%] border-2 text-center border-r-0">Pending Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">Recieve Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">Amount</p>
          <p className="w-[10%] border-2 text-center border-r-0">Charges</p>
          <p className="w-[10%] border-2 text-center border-r-0">Batch No</p>
          <p className="w-[5%] border-2 text-center border-r-0">Add</p>
          <p className="w-[5%] border-2 text-center ">Rem</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="w-[5%] border-2 text-center text-sm border-r-0 p-1">
            435
          </p>
          <p className="w-[15%] border-2 text-center text-sm border-r-0 p-1">
            BONA PAPA PAMPER
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            EACH
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            35
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            35
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            <input
              type="number"
              className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
              placeholder="Receive Qty"
            />
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            <input
              type="number"
              className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
              placeholder="Amount"
            />
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            Charges
          </p>
          <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
            <input
              type="text"
              className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
              placeholder="Batch No"
            />
          </p>
          <p className="w-[5%] border-2 text-center text-sm border-r-0 p-1 font-bold text-red-600">
            +
          </p>
          <p className="w-[5%] border-2 text-center text-sm p-1 font-bold text-red-600">
            ---
          </p>
        </div>
      </Card>

      <Modal
        isOpen={openLocation}
        onOpenChange={handleOpenLocaion}
        headerCode="location Code"
        headerName="Location Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => update_details(data, "location")}
      />
      <Modal
        isOpen={openSupplier}
        onOpenChange={handleOpenSupplier}
        headerCode="Supplier Code"
        headerName="Supplier Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => update_details(data, "supplier")}
      />
      <Modal
        isOpen={openLocation}
        onOpenChange={handleOpenLocaion}
        headerCode="location Code"
        headerName="Location Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => update_details(data, "location")}
      />
      <Modal
        isOpen={openPO}
        onOpenChange={handleOpenPO}
        headerCode="PO No"
        headerName="Supliers Name"
        headerStatus="Date"
        placeholder="Search"
        onClick={(data) => get_authentic_po(data)}
      />
    </div>
  );
};

export default GRN;
