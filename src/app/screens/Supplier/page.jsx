import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Supplier = () => {
  const [name, setname] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [supplierData, setSupplierData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const url = useSelector((state) => state.main.url);

  useEffect(() => {
    allSuppliers();
  }, [toggle]);

  const submitHandler = async () => {
    try {
      if (id !== "") {
        return updateHandler();
      }
      const response = await fetch(`${url}/supplier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          phone,
          status,
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

  const allSuppliers = async () => {
    try {
      const response = await fetch(`${url}/supplier`, {
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
      setSupplierData(data?.data?.data);
      console.log("response ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItem = (data) => {
    setname(data?.name);
    setId(data?.id);
    setPhone(data?.phone);
    setEmail(data?.email);
    setStatus(data?.status);
  };

  const reset = () => {
    setEmail("");
    setId("");
    setPhone("");
    setStatus(false);
    setname("");
  };

  const updateHandler = async () => {
    try {
      const response = await fetch(`${url}/supplier`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, phone, email, status, id }),
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
        <Heading text="Create Supplier" className="mt-4 text-3xl p-2" />
      </Card>
      <Card className="p-2 mt-4">
        <LabInput
          label="Supplier Name:"
          onChange={(e) => setname(e.target.value.toUpperCase())}
          value={name}
          placeholder="Enter supplier name"
          type="text"
        />
        <LabInput
          label="Phone:"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder="Enter phone number"
          type="number"
        />
        <LabInput
          label="Email:"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter email address"
          type="text"
        />
        <LabInput
          label="status:"
          onChange={(e) => setStatus(e.target.checked)}
          placeholder="Enter Unit Name"
          type="checkbox"
          checked={status}
        />
        <div className="flex justify-center space-x-3 mt-4">
          <Button
            onClick={() => submitHandler()}
            text={id !== "" ? "Update" : "Save"}
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
        {supplierData !== null &&
          supplierData.map((items, index) => (
            <div className="w-full flex mt-2" key={index}>
              <p className="w-[20%] border-2 border-r-0 text-center">
                {items?.id}
              </p>
              <p className="w-[60%] border-2 border-r-0 text-center">
                {items?.name}
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

export default Supplier;
