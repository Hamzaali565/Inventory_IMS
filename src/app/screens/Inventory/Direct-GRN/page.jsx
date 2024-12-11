"use client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DirectGrn = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [location, setLocation] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [grn_date, setGrnDate] = useState("");
  const [bill_no, setBillNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dGrn, setDGrn] = useState([
    {
      item_id: 0,
      item_name: "",
      unit_id: 0,
      item_unit: 0,
      t_qty: 0,
      r_qty: 0,
      b_qty: 0,
      charges: 0,
      amount: 0,
      p_size_status: 0,
      p_size_qty: 0,
      batch_no: 0,
      batch_qty: 0,
      p_size_stock: 0,
    },
  ]);
  const url = useSelector((state) => state.main.url);

  useEffect(() => {
    total_amount();
  }, [dGrn]);

  const reset = () => {
    setLocation(null);
    setSupplier(null);
    setGrnDate("");
    setBillNo("");
    setRemarks("");
    setMessage("");
    setData([]);
    setDGrn([
      {
        item_id: 0,
        item_name: "",
        unit_id: 0,
        item_unit: 0,
        t_qty: 0,
        r_qty: 0,
        b_qty: 0,
        charges: 0,
        amount: 0,
        p_size_status: 0,
        p_size_qty: 0,
        batch_no: 0,
        batch_qty: 0,
        p_size_stock: 0,
      },
    ]);
  };

  const handleOpenLocaion = (open) => {
    setOpenLocation(open);
  };

  const handleOpenSupplier = (open) => {
    setOpenSupplier(open);
  };

  const handleOpenItem = (open, index) => {
    setIsItemOpen(open);
    setModalIndex(index);
  };

  const handleOpenPO = (open) => {
    setOpenPO(open);
  };

  const update_details = (data, key) => {
    if (key === "location") {
      setLocation(data);
      return;
    } else {
      setSupplier(data);
    }
  };

  const get_authentic_po = async (value) => {
    try {
      const response = await fetch(
        `${url}/purchase_order_sorted?po_no=${value?.po_no}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let mainRes = await response.json();
      let dataRes = mainRes.data.data;
      let messageRes = mainRes.message;
      console.log("message", messageRes);
      console.log("data", dataRes);
      if (messageRes === "grn_transaction_check") {
        setMessage(messageRes);
        dataRes = dataRes.map((items) => ({
          ...items,
          amount: 0,
          charges: 0,
          batch_no: 0,
          r_qty: 0,
        }));
        console.log("formatedRes", dataRes);

        setData(dataRes);
        return;
      }
      dataRes = dataRes.map((items) => ({
        ...items,
        t_qty: items?.qty,
        r_qty: items?.r_qty || 0,
        p_qty: items?.qty - items?.r_qty || 0,
        amount: 0,
        charges: 0,
        p_size_qty: items?.p_size_qty === null ? 0 : items?.p_size_qty,
      }));
      setData(dataRes);
      console.log(dataRes);
    } catch (error) {
      console.log(error);
    }
  };

  const removeRow = (indexValue, key) => {
    if (key === "Add") {
      setDGrn([
        ...dGrn,
        {
          item_id: 0,
          item_name: "",
          unit_id: 0,
          item_unit: 0,
          t_qty: 0,
          r_qty: 0,
          b_qty: 0,
          charges: 0,
          amount: 0,
          p_size_status: 0,
          p_size_qty: 0,
          batch_no: 0,
          batch_qty: 0,
          p_size_stock: 0,
        },
      ]);
      return;
    }
    if (key === "less") {
      if (dGrn.length === 1) {
        return;
      }
      const filterRow = dGrn.filter((_, index) => index !== indexValue);

      setDGrn(filterRow);
    }
  };

  const handleInputs = (value, key, valIndex) => {
    try {
      let updatedData = dGrn.map((item, index) => {
        if (index === valIndex) {
          if (key === "r_qty") {
            return {
              ...item,
              r_qty: +value,
              t_qty: +value,
              amount: Number(value * item?.charges),
              batch_qty: +value,
              p_size_stock:
                item?.p_size_status === 0
                  ? +value
                  : Number(value * item?.p_size_qty),
            };
          }
          if (key === "b_qty") {
            return { ...item, b_qty: +value };
          }
          if (key === "batch_no") {
            return { ...item, batch_no: value };
          }
          if (key === "charges") {
            return {
              ...item,
              charges: +value,
              amount: Number(item?.r_qty * value),
            };
          }
        }
        return item;
      });
      console.log(updatedData);

      setDGrn(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const total_amount = () => {
    let total = dGrn.reduce((a, b) => a + b.amount, 0);

    setTotalAmount(total);
  };

  const updateForItem = (item_data) => {
    const isDuplicate = dGrn.some(
      (item) => item_data?.item_id === item?.item_id
    );
    if (isDuplicate) {
      alert(`Duplicate items not allowed !!!`);
      return;
    }
    let updatedData = dGrn.map((items, index) => {
      if (index === currentIndex) {
        return {
          ...items,
          item_name: item_data?.item_name,
          item_id: item_data?.item_id,
          item_unit: item_data?.item_unit,
          unit_id: item_data?.unit_id,
          p_size_status: item_data?.p_size_status,
          p_size_qty: item_data?.p_size_qty,
        };
      }
      return items;
    });
    console.log("item_data", item_data);
    setDGrn(updatedData);
  };

  const validation_check = () => {
    try {
      if (!supplier) throw new Error("Please Select Supplier !!!");
      if (!location) throw new Error("Please Select Location !!!");
      if (!grn_date) throw new Error("Please Select GRN Date !!!");

      let alphaDataa = dGrn.map((items, index) => {
        const { r_qty, charges, batch_no } = items;

        if (r_qty <= 0 || charges <= 0 || !batch_no) {
          throw new Error(`Some data missing at line no ${index + 1}`);
        }
        return;
      });

      submitHandler(alphaDataa);
    } catch (error) {
      alert(error.message);
    }
  };

  const submitHandler = async (myData) => {
    try {
      const response = await fetch(`${url}/direct-grn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          grn_date,
          bill_no,
          remarks,
          po_no: data[0]?.po_no,
          location: location?.name,
          supplier_name: supplier?.name,
          supplier_id: supplier?.code,
          location_id: location?.code,
          grnDetails: dGrn,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let dataRes = await response.json();
      console.log(dataRes);
      reset();
      alert(`GRN Created Successfully ⚡⚡`);
    } catch (error) {
      console.log(error);
      alert(`GRN creation failed contact to Muhammad Hamza !!!`);
    }
  };

  return (
    <div>
      <Card>
        <Heading
          text={"Direct Good Receipt Note"}
          className={"mt-2 text-2xl p-2"}
        />
      </Card>
      <Card>
        <div className={"grid grid-cols-2 mt-2 p-2"}>
          {/* <Button
            text={"Select PO"}
            classNameText={"w-40"}
            onClick={() => console.log(true)}
          /> */}
          <Button
            text={"Select Supplier"}
            classNameText={"w-40"}
            onClick={() => setOpenSupplier(true)}
          />
          <Button
            text={"Select Location"}
            classNameText={"w-40"}
            onClick={() => setOpenLocation(true)}
          />
          {/* <LabInput
            placeholder={"PO Number"}
            disabled={true}
            value={data[0]?.po_no || ""}
          /> */}
          <LabInput
            placeholder={"Supplier Name"}
            disabled={true}
            value={supplier?.name || ""}
          />
          <LabInput
            placeholder={"Location"}
            disabled={true}
            value={location?.name || ""}
          />
          <LabInput
            placeholder={"Bill No"}
            onChange={(e) => setBillNo(e.target.value)}
            value={bill_no}
          />
          <LabInput
            placeholder={"Bill Date"}
            value={grn_date}
            type={"Date"}
            onChange={(e) => setGrnDate(e.target.value)}
          />
          <LabInput
            placeholder={"Remarks"}
            onChange={(e) => setRemarks(e.target.value)}
            value={remarks}
          />
        </div>
        <div className="flex p-2 justify-center mt-3 space-x-4">
          <Button text={"Save"} onClick={validation_check} />
          <Button text={"Reset"} onClick={reset} />
        </div>
      </Card>

      <Card className={"mt-3"}>
        <div className="flex justify-between p-2">
          <p className="w-[15%] border-2 text-center border-r-0">Select Item</p>
          <p className="w-[15%] border-2 text-center border-r-0">Item</p>
          <p className="w-[10%] border-2 text-center border-r-0">Unit</p>
          <p className="w-[10%] border-2 text-center border-r-0">Recieve Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">Bonus Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">Charges</p>
          <p className="w-[10%] border-2 text-center border-r-0">Amount</p>
          <p className="w-[10%] border-2 text-center border-r-0">Batch No</p>
          <p className="w-[10%] border-2 text-center ">Rem</p>
        </div>
        {dGrn.length !== 0 &&
          dGrn?.map((items, index) => (
            <div className="flex justify-between items-center" key={index}>
              <p className="w-[15%] border-2 text-center text-sm border-r-0 p-1">
                <Button
                  text={"Item"}
                  onClick={() => {
                    setIsItemOpen(true);
                    setCurrentIndex(index);
                  }}
                />
              </p>
              <p
                className={`${
                  items?.p_size_status === 1 ? "text-green-600 font-bold" : ""
                } w-[15%] border-2 text-center text-sm border-r-0 p-1`}
              >
                {items?.item_name ? items?.item_name : "Item Name"}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                {items?.item_unit}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                <input
                  type="number"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="Receive Qty"
                  onChange={(e) => handleInputs(e.target.value, "r_qty", index)}
                  value={items?.r_qty}
                  disabled={items?.item_id === 0 ? true : false}
                />
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                <input
                  type="number"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="Receive Qty"
                  onChange={(e) => handleInputs(e.target.value, "b_qty", index)}
                  value={items?.b_qty}
                  disabled={items?.item_id === 0 ? true : false}
                />
              </p>

              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                <input
                  type="number"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="Charges"
                  onChange={(e) =>
                    handleInputs(e.target.value, "charges", index)
                  }
                  value={items?.charges}
                  disabled={items?.item_id === 0 ? true : false}
                />
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                {items?.amount}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                <input
                  type="text"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="Batch No"
                  onChange={(e) =>
                    handleInputs(e.target.value, "batch_no", index)
                  }
                  value={items?.batch_no}
                />
              </p>

              <div className="w-[10%] grid grid-cols-2 text-lg border-2 text-center p-1 font-bold text-red-600 cursor-pointer">
                <p onClick={() => removeRow(index, "Add")}>+</p>
                <p onClick={() => removeRow(index, "less")}>---</p>
              </div>
            </div>
          ))}
        <div className="text-right border-2 pr-10">
          Total Amount: {totalAmount}
        </div>
      </Card>

      <Modal
        isOpen={openLocation}
        onOpenChange={handleOpenLocaion}
        headerCode="location Code"
        headerName="Location Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => update_details(data, "location")}
      />
      <Modal
        isOpen={openSupplier}
        onOpenChange={handleOpenSupplier}
        headerCode="Supplier Code"
        headerName="Supplier Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => update_details(data, "supplier")}
      />
      <Modal
        isOpen={openLocation}
        onOpenChange={handleOpenLocaion}
        headerCode="location Code"
        headerName="Location Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => update_details(data, "location")}
      />
      <Modal
        isOpen={openPO}
        onOpenChange={handleOpenPO}
        headerCode="PO No"
        headerName="Supliers Name"
        headerStatus="Date"
        placeholder="Search"
        onClick={(data) => get_authentic_po(data)}
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
    </div>
  );
};

export default DirectGrn;
