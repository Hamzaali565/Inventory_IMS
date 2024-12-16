"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import LabelledDropDown from "@/app/components/LabelledDropDown";
import { LabInput } from "@/app/components/LabInput";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OtherExpense = () => {
  const [expenseType, setExpenseType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState(0);
  const [dropData, setDropData] = useState([
    { name: "---" },
    { name: "SALARY" },
    { name: "RENOVATION" },
    { name: "LOAN" },
    { name: "OTHER" },
  ]);
  const [toggle, setToggle] = useState(false);
  const url = useSelector((state) => state.main.url);
  useEffect(() => {
    setDropData([
      { name: "---" },
      { name: "SALARY" },
      { name: "RENOVATION" },
      { name: "LOAN" },
      { name: "OTHER" },
    ]);
  }, [toggle]);

  const resetFunc = () => {
    setDropData([]);
    setExpenseType("");
    setRemarks("");
    setAmount(0);
    setToggle(!toggle);
  };

  const submitExpense = async () => {
    try {
      if (expenseType === "" || expenseType === "---")
        throw new Error(`Please Select Expense Type`);
      if (remarks === "") throw new Error(`Please Enter remarks`);
      if (amount === 0) throw new Error(`Please Enter Amount`);
      let response = await fetch(`${url}/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenseType,
          remarks,
          amount,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      response = (await response.json()).data;
      console.log("response", response);
      alert("Expense Added Successfully");
      resetFunc();
    } catch (error) {
      alert(error.message);
      console.log("Error", error);
    }
  };

  return (
    <div>
      <Card className={"my-2"}>
        <Heading text={"Other Expense"} className={"p-2 text-lg"} />
      </Card>
      <Card className={"p-4"}>
        <div className={"grid grid-cols-3"}>
          <LabelledDropDown
            data={dropData}
            label={"Expense Type"}
            onChange={(value) => setExpenseType(value)}
          />
          <LabInput
            label={"Remarks"}
            placeholder={"Remarks"}
            onChange={(e) => setRemarks(e.target.value.toUpperCase())}
            value={remarks}
          />
          <LabInput
            label={"Amount"}
            placeholder={"Amount"}
            onChange={(e) => setAmount(Number(e.target.value))}
            type={"Number"}
            value={amount}
          />
        </div>
        <div className="flex justify-center space-x-3 my-5">
          <Button text={"Save"} onClick={submitExpense} />
          <Button text={"Reset"} onClick={resetFunc} />
        </div>
      </Card>
    </div>
  );
};

export default OtherExpense;
