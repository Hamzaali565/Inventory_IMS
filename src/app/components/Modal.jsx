import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LabInput } from "./LabInput";
import Heading from "./Heading";
import { useSelector } from "react-redux";

const Modal = ({
  isOpen,
  onOpenChange,
  dataI,
  placeholder,
  headerCode,
  headerName,
  headerStatus,
  onClick,
}) => {
  const [data, setData] = useState(dataI);
  const [copyData, setCopyData] = useState(dataI);
  const [toggle, setToggle] = useState(false);
  const url = useSelector((state) => state.main.url);

  useEffect(() => {
    if (isOpen) {
      if (headerName === "Unit Name") {
        getUnits();
        return;
      } else if (headerName === "Category Name") {
        getCategory();
        return;
      } else if (headerName === "Item Name") {
        getItem();
        return;
      } else if (headerName === "Location Name") {
        getLocation();
        return;
      }
      console.log("effected");
    }
  }, [isOpen, toggle]);

  const getUnits = async () => {
    try {
      const response = await fetch(`${url}/unit`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const units = await response.json();
      const structuredData = units.data.data.map((items) => ({
        code: items.unit_id,
        name: items.unit_name,
        status: "true",
      }));

      console.log(structuredData);
      setData(structuredData);
      setCopyData(structuredData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await fetch(`${url}/category`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const category = await response.json();
      const structuredData = category.data.data.map((items) => ({
        code: items.id,
        name: items.category_name,
        status: "true",
      }));

      console.log(structuredData);
      setData(structuredData);
      setCopyData(structuredData);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getItem = async () => {
    try {
      const response = await fetch(`${url}/item`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const category = await response.json();
      const structuredData = category.data.data.map((items) => ({
        ...items,
        code: items.item_id,
        name: items.item_name,
        status: "true",
      }));

      console.log(structuredData);
      setData(structuredData);
      setCopyData(structuredData);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getLocation = async () => {
    try {
      const response = await fetch(`${url}/location`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const category = await response.json();
      const structuredData = category.data.data.map((items) => ({
        ...items,
        code: items.id,
        name: items.name,
        status: "true",
      }));

      setData(structuredData);
      setCopyData(structuredData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const filterNames = (input) => {
    const searchTerm = input.toLowerCase();
    if (input === "") {
      setToggle(!toggle);
      return;
    }
    if (!data) {
      return null;
    }
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );

    if (filteredData.length <= 0) {
      setData(copyData);
      return;
    }
    setData(filteredData);
    console.log("filteredData", copyData);
    console.log("filteredData", data);
  };

  const sendToParent = (item) => {
    onClick(item);
    onOpenChange(false); // Close the modal when data is sent
  };

  const closeModal = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="h-[83%] overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            <p
              className="text-red-600 text-right cursor-pointer"
              onClick={() => closeModal()}
            >
              X
            </p>
            <Heading text="Search Item" />
          </AlertDialogTitle>
          <AlertDialogTitle className="text-center">
            <LabInput
              label="Search"
              onChange={(e) => filterNames(e.target.value)}
              placeholder={placeholder}
              type="text"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full flex ">
              <p className="w-[20%] border-2 border-r-0 text-center p-1">
                {headerCode}
              </p>
              <p className="w-[60%] border-2 border-r-0 text-center p-1">
                {headerName}
              </p>
              <p className="w-[20%] border-2 text-center p-1">{headerStatus}</p>
            </div>
            <div
              className="border-2 p-2 overflow-y-auto scrollbar-hide"
              style={{}}
            >
              {data &&
                data.map((items, index) => (
                  <div
                    className="w-full flex mt-2 cursor-pointer"
                    key={index}
                    onClick={() => sendToParent(items)}
                  >
                    <p className="w-[20%] border-2 border-r-0 text-center ">
                      {items?.code}
                    </p>
                    <p className="w-[60%] border-2 border-r-0 text-center ">
                      {items.name}
                    </p>
                    <p className="w-[20%] border-2 text-center">
                      {items?.status}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-2"></div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
