import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import { RootState } from "@/Store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operation, setOperation] = useState("Add");
  const [itemDetail, setItemDetail] = useState({
    item_name: "",
    unit_name: "",
    unit_id: 0,
    p_price: 0,
    s_price: 0,
  });

  const url = useSelector((state: RootState) => state.main.url);

  const updateItemDetails = (
    value: string | number | { name: string; code: number; status: string },
    iKey: string
  ) => {
    // Use for...in loop to iterate through keys in newValues
    console.log(value);
    if (typeof value === "object") {
      setItemDetail((previtems) => ({
        ...previtems,
        unit_name: value?.name,
        unit_id: value?.code,
      }));
      return;
    }
    setItemDetail((prevValue) => ({
      ...prevValue,
      [iKey]: typeof value === "string" ? value.toUpperCase() : value,
    }));
    console.log(itemDetail);
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const submitItem = async () => {
    try {
      for (const key in itemDetail) {
        if (itemDetail[key as keyof typeof itemDetail] === "") {
          alert("Please fill all fields");
          return;
        }
      }
      const response = await fetch(`${url}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemDetail),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="p-2 m-2">
        <Heading text="Create Items" className="text-3xl" />
      </Card>
      <Card className="p-2 m-2 lg:mt-6">
        <div className="flex justify-center space-x-2 my-4">
          <Button onClick={() => setOperation("Add")} text="Add" />
          <Button onClick={() => setOperation("Update")} text="Update" />
        </div>
      </Card>

      <Card className="p-2 m-2 lg:mt-6">
        <LabInput
          label="Items Name"
          onChange={(e) => updateItemDetails(e.target.value, "item_name")}
          placeholder="Enter item name"
          type="text"
          value={itemDetail?.item_name}
        />
        <LabInput
          label="Bar Code"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Scan bar code"
          type="text"
          disabled
        />
        <LabInput
          label="Unit"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Select unit"
          type="text"
          disabled={true}
          value={itemDetail?.unit_name}
        />
        <LabInput
          label="Purchase Price"
          onChange={(e) => updateItemDetails(e.target.value, "p_price")}
          placeholder="Enter purchase price"
          type="number"
          value={itemDetail?.p_price}
        />
        <LabInput
          label="Sale Price"
          onChange={(e) => updateItemDetails(e.target.value, "s_price")}
          placeholder="Enter sale price"
          type="number"
          value={itemDetail?.s_price}
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          text={operation === "Add" ? "Select Unit" : "Select Item"}
          className="mt-3"
          classNameText="w-40"
        />
        <Modal
          isOpen={isModalOpen}
          onOpenChange={handleOpenChange}
          headerCode="Unit Code"
          headerName="Unit Name"
          headerStatus="Status"
          placeholder="Search"
          onClick={(data) => updateItemDetails(data, "object")}
        />

        <div className="flex justify-center space-x-2 my-4">
          <Button
            onClick={() => submitItem()}
            text={operation === "Add" ? "Save" : "Update"}
          />
          <Button onClick={() => console.log("Clicked")} text="Reset" />
        </div>
      </Card>
    </div>
  );
};

export default Inventory;
