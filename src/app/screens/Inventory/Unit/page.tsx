import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import { RootState } from "@/Store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface DataItem {
  unit_id: string;
  unit_name: string;
}

const Unit = () => {
  const [unitName, setUnitName] = useState("");
  const [unitData, setUnitData] = useState<DataItem[] | null>(null);
  const url = useSelector((state: RootState) => state.main.url);
  console.log(url);

  useEffect(() => {
    allUnits();
  }, []);

  const submitHandler = async () => {
    try {
      const response = await fetch(`${url}/unit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          unit_name: unitName,
          c_user: "Hamza",
        }),
      });
      if (!response.ok) {
        // Handle HTTP errors
        console.log(await response.json());

        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("response", response);
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  const allUnits = async () => {
    try {
      const response = await fetch(`${url}/unit`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUnitData(data?.data?.data);
      console.log("response ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card>
        <Heading text="Create Unit" className="mt-4 text-3xl p-2" />
      </Card>
      <Card className="p-2 mt-4">
        <LabInput
          label="Unit Name:"
          onChange={(e) => setUnitName(e.target.value.toUpperCase())}
          value={unitName}
          placeholder="Enter Unit Name"
          type="text"
        />
        <Button onClick={() => submitHandler()} text="Save" className="my-4" />
        <div className="w-full flex">
          <p className="w-[20%] border-2 border-r-0 text-center p-1">
            Unit Code
          </p>
          <p className="w-[60%] border-2 border-r-0 text-center p-1">
            Unit Name
          </p>
          <p className="w-[20%] border-2 text-center p-1">Update</p>
        </div>
        {unitData !== null &&
          unitData.map((items, index) => (
            <div className="w-full flex mt-2" key={index}>
              <p className="w-[20%] border-2 border-r-0 text-center">
                {items?.unit_id}
              </p>
              <p className="w-[60%] border-2 border-r-0 text-center">
                {items?.unit_name}
              </p>
              <p className="w-[20%] border-2 text-center">Update</p>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default Unit;
