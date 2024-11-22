import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };
  return (
    <div>
      <Card className="p-2 m-2">
        <Heading text="Create Items" className="text-3xl" />
      </Card>
      <Card className="p-2 m-2 lg:mt-14">
        <LabInput
          label="Items Name"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Enter item name"
          type="text"
        />
        <LabInput
          label="Bar Code"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Scan bar code"
          type="text"
        />
        <LabInput
          label="Unit"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Select unit"
          type="text"
          disabled={true}
        />
        <LabInput
          label="Purchase Price"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Enter purchase price"
          type="number"
        />
        <LabInput
          label="Sale Price"
          onChange={(e) => console.log(e.target.value)}
          placeholder="Enter sale price"
          type="number"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          text="Select Unit"
          className="mt-3"
          classNameText="w-40"
        />
        <Modal isOpen={isModalOpen} onOpenChange={handleOpenChange} />

        <div className="flex justify-center space-x-2 my-4">
          <Button onClick={() => console.log("Clicked")} text="Save" />
          <Button onClick={() => console.log("Clicked")} text="Reset" />
        </div>
      </Card>
    </div>
  );
};

export default Inventory;
