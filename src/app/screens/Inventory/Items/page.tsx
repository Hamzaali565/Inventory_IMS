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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [item_id, setitem_id] = useState(0);
  const [itemDetail, setItemDetail] = useState({
    item_name: "",
    item_unit: "",
    unit_id: 0,
    category_name: "",
    category_id: 0,
    p_price: 0,
    s_price: 0,
    c_user: "Hamza",
  });

  const url = useSelector((state: RootState) => state.main.url);

  const updateItemDetails = (
    value: string | number | { name: string; code: number; status: string },
    iKey: string
  ) => {
    // Use for...in loop to iterate through keys in newValues
    console.log(value);
    if (typeof value === "object") {
      if (iKey === "category") {
        setItemDetail((previtems) => ({
          ...previtems,
          category_name: value?.name,
          category_id: value?.code,
        }));
        return;
      }
      setItemDetail((previtems) => ({
        ...previtems,
        item_unit: value?.name,
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

  const updateForItem = (value: {
    code: number;
    name: string;
    item_unit: string;
    unit_id: number;
    category_name: string;
    category_id: number;
    p_price: number;
    s_price: number;
  }) => {
    setItemDetail((prevValue) => ({
      ...prevValue,
      item_name: value.name,
      item_unit: value.item_unit,
      unit_id: value.unit_id,
      category_name: value.category_name,
      category_id: value.category_id,
      p_price: value.p_price,
      s_price: value.s_price,
    }));
    setitem_id(value.code);
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };
  const handleOpenCategory = (open: boolean) => {
    setIsCategoryOpen(open);
  };
  const handleOpenItem = (open: boolean) => {
    setIsItemOpen(open);
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
      console.log(await response.json());
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    setItemDetail({
      item_name: "",
      item_unit: "",
      unit_id: 0,
      category_name: "",
      category_id: 0,
      p_price: 0,
      s_price: 0,
      c_user: "Hamza",
    });
  };

  return (
    <div>
      <Card className="p-2 m-2">
        <Heading text="Create Items" className="text-3xl" />
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
        <LabInput
          label="Unit"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Select unit"
          type="text"
          disabled={true}
          value={itemDetail?.item_unit}
        />
        <LabInput
          label="Category"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Select Category"
          type="text"
          disabled={true}
          value={itemDetail?.category_name}
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          text={"Select Unit"}
          className="mt-3"
          classNameText="w-40"
        />
        <Button
          onClick={() => setIsCategoryOpen(true)}
          text={"Select Category"}
          className="mt-3"
          classNameText="w-40"
        />
        <Button
          onClick={() => setIsItemOpen(true)}
          text={"Select Item"}
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
        <Modal
          isOpen={isCategoryOpen}
          onOpenChange={handleOpenCategory}
          headerCode="Category Code"
          headerName="Category Name"
          headerStatus="Status"
          placeholder="Search"
          onClick={(data) => updateItemDetails(data, "category")}
        />
        <Modal
          isOpen={isItemOpen}
          onOpenChange={handleOpenItem}
          headerCode="Item Code"
          headerName="Item Name"
          headerStatus="Status"
          placeholder="Search"
          onClick={(data) => updateForItem(data)}
        />

        <div className="flex justify-center space-x-2 my-4">
          <Button
            onClick={() => submitItem()}
            text={item_id !== 0 ? "Update" : "Save"}
          />
          <Button onClick={() => reset()} text="Reset" />
        </div>
      </Card>
    </div>
  );
};

export default Inventory;
