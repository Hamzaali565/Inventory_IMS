"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Unit = () => {
  const [unitName, setUnitName] = useState("");
  const [unitId, setUnitId] = useState("");
  const [unitData, setUnitData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const url = useSelector((state) => state.main.url);

  useEffect(() => {
    allUnits();
  }, [toggle]);

  const submitHandler = async () => {
    try {
      if (unitId !== "") {
        return updateHandler();
      }
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
      reset();
      setToggle(!toggle);
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

  const handleItem = (data) => {
    setUnitName(data?.unit_name);
    setUnitId(data?.unit_id);
  };

  const reset = () => {
    setUnitId("");
    setUnitName("");
  };

  const updateHandler = async () => {
    try {
      const response = await fetch(`${url}/unit?unit_id=${unitId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ unit_name: unitName }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      reset();
      setToggle(!toggle);
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
        <div className="flex justify-center space-x-3 mt-4">
          <Button
            onClick={() => submitHandler()}
            text={unitId !== "" ? "Update" : "Save"}
            className="my-4"
          />
          <Button onClick={() => reset()} text="reset" className="my-4" />
        </div>
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
              <p
                onClick={() => handleItem(items)}
                className="w-[20%] border-2 text-center hover:text-blue-800 cursor-pointer hover:underline hover:font-bold"
              >
                Update
              </p>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default Unit;
