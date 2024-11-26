import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import React from "react";

const PurcahseOrder = () => {
  return (
    <div>
      <Card className={"p-2 mt-3"}>
        <Heading text={"Create Purchase Order"} className={"text-2xl"} />
      </Card>

      <Card className={"grid grid-cols-3 gap-3 p-2 mt-2"}>
        <Button text={"Supplier"} />
        <Button text={"Location"} />
        <Button text={"PO"} />
        <LabInput placeholder={"Suppier Name"} disabled={true} />
        <LabInput placeholder={"Location"} disabled={true} />
        <LabInput label={"PO Date"} type={"date"} />
      </Card>
    </div>
  );
};

export default PurcahseOrder;
