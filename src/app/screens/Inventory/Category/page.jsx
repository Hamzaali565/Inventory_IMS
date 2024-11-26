import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Category = () => {
  const [category_name, setCategoryName] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [unitData, setUnitData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const url = useSelector((state) => state.main.url);
  console.log(url);

  useEffect(() => {
    allCategory();
  }, [toggle]);

  const submitHandler = async () => {
    try {
      if (category_id !== "") {
        return updateHandler();
      }
      const response = await fetch(`${url}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          category_name,
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

  const allCategory = async () => {
    try {
      const response = await fetch(`${url}/category`, {
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
    setCategoryName(data?.category_name);
    setCategory_id(data?.id);
  };

  const reset = () => {
    setCategory_id("");
    setCategoryName("");
  };

  const updateHandler = async () => {
    try {
      const response = await fetch(`${url}/category?id=${category_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ category_name }),
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
        <Heading text="Create Category" className="mt-4 text-3xl p-2" />
      </Card>
      <Card className="p-2 mt-4">
        <LabInput
          label="Unit Name:"
          onChange={(e) => setCategoryName(e.target.value.toUpperCase())}
          value={category_name}
          placeholder="Enter category Name"
          type="text"
        />
        <div className="flex justify-center space-x-3 mt-4">
          <Button
            onClick={() => submitHandler()}
            text={category_id !== "" ? "Update" : "Save"}
            className="my-4"
          />
          <Button onClick={() => reset()} text="reset" className="my-4" />
        </div>
        <div className="w-full flex">
          <p className="w-[20%] border-2 border-r-0 text-center p-1">
            Category Code
          </p>
          <p className="w-[60%] border-2 border-r-0 text-center p-1">
            Category Name
          </p>
          <p className="w-[20%] border-2 text-center p-1">Update</p>
        </div>
        {unitData !== null &&
          unitData.map((items, index) => (
            <div className="w-full flex mt-2" key={index}>
              <p className="w-[20%] border-2 border-r-0 text-center">
                {items?.id}
              </p>
              <p className="w-[60%] border-2 border-r-0 text-center">
                {items?.category_name}
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

export default Category;
