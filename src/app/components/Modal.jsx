"use client";

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
import moment from "moment";

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
      } else if (headerName === "Supplier Name") {
        getSupplier();
        return;
      } else if (headerName === "Suppliers Name") {
        getPO();
        return;
      } else if (headerName === "Supliers Name") {
        get_po_incompleted();
        return;
      } else if (headerName === "Payment Supliers Name") {
        false_payment();
        return;
      } else if (headerName === "Customer Name") {
        credit_clearance();
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

  const getSupplier = async () => {
    try {
      const response = await fetch(`${url}/supplier`, {
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

  const getPO = async () => {
    try {
      const response = await fetch(`${url}/purchase_order`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const category = await response.json();
      const structuredData = category.data.data.map((items) => ({
        ...items,
        code: items.po_no,
        name: items.supplier_name,
        status: moment(items.c_date).format("DD/MM/YYYY"),
      }));

      setData(structuredData);
      setCopyData(structuredData);
    } catch (error) {
      console.log("error", error);
    }
  };
  const get_po_incompleted = async () => {
    try {
      const response = await fetch(`${url}/purchase_order_incompleted`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const category = await response.json();
      const structuredData = category.data.data.map((items) => ({
        ...items,
        code: items.po_no,
        name: items.supplier_name,
        status: moment(items.c_date).format("DD/MM/YYYY"),
      }));

      setData(structuredData);
      setCopyData(structuredData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const false_payment = async () => {
    try {
      const response = await fetch(`${url}/false-payment`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const category = await response.json();
      const structuredData = category.data.data.map((items) => ({
        ...items,
        code: items.grn_no,
        name: items.supplier_name,
        status: items?.difference,
      }));

      setData(structuredData);
      console.log(structuredData);

      setCopyData(structuredData);
    } catch (error) {
      console.log("error", error);
    }
  };
  const credit_clearance = async () => {
    try {
      const response = await fetch(`${url}/credit_for_clearance`, {
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
        name: items.costumer_name,
        status: items?.difference,
      }));

      setData(structuredData);
      console.log(structuredData);

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
    onOpenChange(false);
    setData([]);
    setCopyData([]);
  };

  const closeModal = () => {
    onOpenChange(false);
    setData([]);
    setCopyData([]);
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
              className="border-2 p-2 overflow-y-auto scrollbar-hide max-h-[50vh]"
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
