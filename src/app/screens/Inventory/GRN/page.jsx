"use-client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";

const GRN = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [location, setLocation] = useState(null);
  const [supplier, setSupplier] = useState(null);

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
        headerName="Suppliers Name"
        headerStatus="Date"
        placeholder="Search"
        onClick={(data) => console.log(data)}
      />
    </div>
  );
};

export default GRN;
