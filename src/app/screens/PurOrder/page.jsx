"use client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PurcahseOrder = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [location, setLocation] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [po_date, setPoDate] = useState("");
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [grnTransaction, setGrnTransaction] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [po_detail, setPODetail] = useState([]);
  const [po_master, setPOMaster] = useState([]);
  const [data, setData] = useState([
    {
      item_name: "",
      item_id: 0,
      qty: 0,
      charges: 0,
      amount: 0,
      p_size_status: false,
      p_size_qty: 0,
      item_unit: "",
      unit_id: 0,
    },
  ]);

  const url = useSelector((state) => state.main.url);

  const handleOpenLocaion = (open) => {
    setOpenLocation(open);
  };

  const handleOpenSupplier = (open) => {
    setOpenSupplier(open);
  };
  const handleOpenPO = (open) => {
    setOpenPO(open);
  };

  const openModal = (index) => {
    console.log(index);
    setIsItemOpen(true);
    setModalIndex(index);
  };

  const updateValues = (value, index, key) => {
    if (po_detail.length !== 0) {
      const updateInputs = po_detail.map((items, itemIndex) => {
        if (itemIndex === index) {
          if (key === "charges") {
            return {
              ...items,
              charges: +value,
              amount: value * items.qty,
            };
          } else if (key === "qty") {
            return {
              ...items,
              qty: +value,
              amount: value * items.charges,
            };
          }
          return { ...items, [key]: value };
        }
        return items;
      });
      setPODetail(updateInputs);
      return;
    }
    const updateInputs = data.map((items, itemIndex) => {
      if (itemIndex === index) {
        if (key === "charges") {
          return {
            ...items,
            charges: +value,
            amount: value * items.qty,
          };
        } else if (key === "qty") {
          return {
            ...items,
            qty: +value,
            amount: value * items.charges,
          };
        }
        return { ...items, [key]: value };
      }
      return items;
    });
    setData(updateInputs);
  };

  const handleRow = (rowIndex, type) => {
    if (po_detail.length !== 0) {
      if (type === "add") {
        setPODetail((prevData) => [
          ...prevData,
          {
            item_name: "",
            item_id: 0,
            item_unit: "",
            unit_id: 0,
            qty: 0,
            charges: 0,
            amount: 0,
            po_no: po_detail[0]?.po_no,
            grn_status: 0,
            p_size_status: false,
            p_size_qty: 0,
          },
        ]);
        return;
      } else if (type === "less") {
        if (po_detail.length === 1) {
          return;
        }
        let filterData = po_detail.filter((_, index) => index !== rowIndex);
        setPODetail(filterData);
      }
    }
    if (type === "add") {
      setData((prevData) => [
        ...prevData,
        {
          item_name: "",
          item_id: 0,
          item_unit: "",
          unit_id: 0,
          qty: 0,
          charges: 0,
          amount: 0,
          p_size_status: false,
          p_size_qty: 0,
        },
      ]);
      return;
    } else if (type === "less") {
      if (data.length === 1) {
        return;
      }
      let filterData = data.filter((_, index) => index !== rowIndex);
      setData(filterData);
    }
  };

  const handleOpenItem = (open, index) => {
    setIsItemOpen(open);
    setModalIndex(index);
  };

  const updateForItem = (value, key) => {
    let checkDulpicate;
    if (po_detail.length !== 0) {
      checkDulpicate = po_detail.find((items) => items.item_id === value.code);
      if (checkDulpicate) {
        alert("Duplicate items not allowed !!!");
        return;
      }
      let updatedData = po_detail.map((item, itemIndex) => {
        if (itemIndex === modalIndex) {
          if (key === "item_name") {
            return {
              ...item,
              item_name: value?.name,
              item_id: value?.code,
              p_size_status: value?.p_size_status,
              p_size_qty: value?.p_size_qty,
              item_unit: value?.item_unit,
              unit_id: value?.unit_id,
            };
          }
        }
        return item;
      });
      console.log(updatedData);
      setPODetail(updatedData);
      return;
    }
    checkDulpicate = data.find((items) => items.item_id === value.code);

    if (checkDulpicate) {
      alert("Duplicate items not allowed !!!");
      return;
    }

    let updatedData = data.map((item, itemIndex) => {
      if (itemIndex === modalIndex) {
        if (key === "item_name") {
          return {
            ...item,
            item_name: value.name,
            item_id: value.code,
            p_size_status: value?.p_size_status,
            p_size_qty: value?.p_size_qty,
            item_unit: value?.item_unit,
            unit_id: value?.unit_id,
          };
        }
      }
      return item;
    });
    console.log(updatedData);
    setData(updatedData);
  };

  const update_details = (value, key) => {
    if (po_master.length !== 0) {
      const updatePOMaster = po_master.map((items) => {
        if (key === "location") {
          return { ...items, location: value?.name, location_id: value?.code };
        }
        if (key === "supplier") {
          return {
            ...items,
            supplier_name: value?.name,
            supplier_id: value?.code,
          };
        }
        if (key === "po_date") {
          return {
            ...items,
            po_date: value,
          };
        }
        return items;
      });
      setPOMaster(updatePOMaster);
      return;
    }

    if (key === "supplier") {
      setSupplier(value);
      return;
    } else if (key === "location") {
      setLocation(value);
      return;
    } else if (key === "po_date") {
      setPoDate(value);
      return;
    }
  };

  const validation = () => {
    if (po_detail.length !== 0) {
      if (grnTransaction) {
        alert(`Cannot edit as GRN is Created!!!`);
        return;
      }
      po_detail.map((items, index) => {
        const { item_name, item_id, qty, charges, amount } = items;
        if (![item_name, item_id, qty, charges, amount].every(Boolean))
          alert(`Some data missing at line no ${index + 1}`);
        return;
      });
      updatePO();
      return;
    }
    if (!supplier) {
      alert("Please select a supplier");
      return;
    } else if (!location) {
      alert("Please select a location");
      return;
    } else if (po_date === "") {
      alert("Please select a PO Date");
      return;
    }
    data.map((items, index) => {
      const { item_name, item_id, qty, charges, amount } = items;
      if (![item_name, item_id, qty, charges, amount].every(Boolean))
        alert(`Some data missing at line no ${index + 1}`);
      return;
    });
    submitData();
  };

  const reset = () => {
    setSupplier(null);
    setLocation(null);
    setPoDate("");
    setData([
      {
        item_name: "",
        item_id: 0,
        qty: 0,
        charges: 0,
        amount: 0,
      },
    ]);
    setPODetail([]);
    setGrnTransaction(0);
    setPOMaster([]);
  };

  const submitData = async () => {
    try {
      const response = await fetch(`${url}/purchase_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          po_date,
          supplier_name: supplier?.name,
          supplier_id: supplier?.code,
          location: location?.name,
          location_id: location?.code,
          data,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      reset();
      alert(`Purchase order created 🙌`);
    } catch (error) {
      console.log("error", error);
      alert(`PO creation failed contact to Muhammad Hamza `);
    }
  };

  const getPoDetail = async (value) => {
    try {
      const response = await fetch(
        `${url}/purchase_order_detail?po_no=${value?.code}`,
        { credentials: "include" }
      );
      const dataResponse = (await response.json()).data;
      console.log(dataResponse);

      const po_master = dataResponse.data.po_master[0];
      setGrnTransaction(po_master.grn_transaction);
      setPODetail(dataResponse?.data?.po_child);
      setPOMaster(dataResponse?.data?.po_master);
      setData([]);
      setSupplier(null);
      setLocation(null);
      // update po_master array instead
    } catch (error) {
      console.log(error);
    }
  };

  const updatePO = async () => {
    try {
      const response = await fetch(`${url}/purchase_order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          po_no: po_master[0].po_no,
          po_date: po_master[0].po_date,
          supplier_name: po_master[0].supplier_name,
          supplier_id: po_master[0].supplier_id,
          data: po_detail,
          location: po_master[0].location,
          location_id: po_master[0].location_id,
        }),
      });
      const dataResponse = await response.json();
      console.log(dataResponse);
      alert("Purchase order updated successfully !!!");
      reset();
    } catch (error) {
      console.log("error ,,", error);
      alert(
        `Updating purchase order failed kindly contact to Muhammad Hamza !!!`
      );
    }
  };
  return (
    <div>
      <Card className={"p-2 mt-3"}>
        <Heading text={"Create Purchase Order"} className={"text-2xl"} />
      </Card>

      <Card className={"p-2 mt-2"}>
        <div className={"grid grid-cols-3 gap-3 p-2 mt-2"}>
          <Button text={"Supplier"} onClick={() => setOpenSupplier(true)} />
          <Button text={"Location"} onClick={() => setOpenLocation(true)} />
          <Button text={"PO"} onClick={() => setOpenPO(true)} />
          <LabInput
            placeholder={"Suppier Name"}
            disabled={true}
            value={supplier?.name || po_master[0]?.supplier_name || ""}
          />
          <LabInput
            placeholder={"Location"}
            disabled={true}
            value={location?.name || po_master[0]?.location || ""}
          />
          <LabInput
            label={"PO Date"}
            type={"date"}
            value={po_date || po_master[0]?.po_date || ""}
            onChange={(e) => update_details(e.target.value, "po_date")}
          />
        </div>
        <div className="flex justify-center space-x-3 mt-4">
          {/* buttons */}
          {grnTransaction === 0 && (
            <Button
              text={po_detail.length === 0 ? "Save" : "Update"}
              onClick={validation}
            />
          )}
          <Button text={"Reset"} onClick={reset} />
        </div>
      </Card>

      <Card className={"mt-2 p-2"}>
        <div className="flex border-2 ">
          <p className="w-[10%] text-center border-r-2">Select Item</p>
          <p className="w-[20%] text-center border-r-2">Item Name</p>
          <p className="w-[20%] text-center border-r-2">Quantity</p>
          <p className="w-[20%] text-center border-r-2">Charges</p>
          <p className="w-[20%] text-center border-r-2">Amount/Total</p>
          <p className="w-[10%] text-center">Add/Rem</p>
        </div>

        {data.length !== 0 &&
          data.map((item, index) => (
            <div className="flex border-2 mt-2 p-1" key={index}>
              <p className="w-[10%] text-center border-r-2">
                <Button onClick={() => openModal(index)} text={"Item"} />
              </p>
              <p className="w-[20%] flex justify-center border-r-2">
                <LabInput
                  placeholder={"item Name"}
                  disabled={true}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={`${
                    item?.p_size_status === 1
                      ? "text-green-500 font-bold"
                      : "p-1"
                  }`}
                  value={item?.item_name}
                />
              </p>
              <p className="w-[20%] border-r-2 flex justify-center">
                <LabInput
                  placeholder={"Quantity"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={"p-1"}
                  type={"number"}
                  value={item?.qty}
                  onChange={(e) => updateValues(e.target.value, index, "qty")}
                />
              </p>
              <p className="w-[20%] text-center border-r-2 flex justify-center">
                {" "}
                <LabInput
                  placeholder={"Charges"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={"p-1"}
                  type={"number"}
                  value={item?.charges}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "charges")
                  }
                />
              </p>
              <p className="w-[20%] text-center border-r-2 flex justify-center">
                {" "}
                <LabInput
                  placeholder={"Amount"}
                  disabled={true}
                  mainStyle={"w-[100%] mt-0"}
                  type={"number"}
                  inpStyle={"p-1"}
                  value={item?.amount}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "amount")
                  }
                />
              </p>
              <div className="w-[10%] grid grid-cols-2 text-2xl justify-items-center ">
                <p
                  className="text-red-600 font-bold cursor-pointer"
                  onClick={() => handleRow(index, "add")}
                >
                  +
                </p>
                <p
                  className="text-red-600 font-bold cursor-pointer"
                  onClick={() => handleRow(index, "less")}
                >
                  _
                </p>
              </div>
            </div>
          ))}

        {po_detail.length !== 0 &&
          po_detail.map((item, index) => (
            <div className="flex border-2 mt-2 p-1" key={index}>
              <p className="w-[10%] text-center border-r-2">
                <Button onClick={() => openModal(index)} text={"Item"} />
              </p>
              <p className="w-[20%] flex justify-center border-r-2">
                <LabInput
                  placeholder={"item Name"}
                  disabled={true}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={`${
                    item?.p_size_status === 1
                      ? "text-green-500 font-bold"
                      : "p-1"
                  }`}
                  value={item?.item_name}
                />
              </p>
              <p className="w-[20%] border-r-2 flex justify-center">
                <LabInput
                  placeholder={"Quantity"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={"p-1"}
                  type={"number"}
                  value={item?.qty}
                  onChange={(e) => updateValues(e.target.value, index, "qty")}
                />
              </p>
              <p className="w-[20%] text-center border-r-2 flex justify-center">
                {" "}
                <LabInput
                  placeholder={"Charges"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={"p-1"}
                  type={"number"}
                  value={item?.charges}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "charges")
                  }
                />
              </p>
              <p className="w-[20%] text-center border-r-2 flex justify-center">
                {" "}
                <LabInput
                  placeholder={"Amount"}
                  disabled={true}
                  mainStyle={"w-[100%] mt-0"}
                  type={"number"}
                  inpStyle={"p-1"}
                  value={item?.amount}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "amount")
                  }
                />
              </p>
              <div className="w-[10%] grid grid-cols-2 text-2xl justify-items-center ">
                <p
                  className="text-red-600 font-bold cursor-pointer"
                  onClick={() => handleRow(index, "add")}
                >
                  +
                </p>
                <p
                  className="text-red-600 font-bold cursor-pointer"
                  onClick={() => handleRow(index, "less")}
                >
                  _
                </p>
              </div>
            </div>
          ))}
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
        isOpen={isItemOpen}
        onOpenChange={handleOpenItem}
        headerCode="Item Code"
        headerName="Item Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => updateForItem(data, "item_name")}
      />
      <Modal
        isOpen={openPO}
        onOpenChange={handleOpenPO}
        headerCode="PO No"
        headerName="Suppliers Name"
        headerStatus="Date"
        placeholder="Search"
        onClick={(data) => getPoDetail(data)}
      />
    </div>
  );
};

export default PurcahseOrder;
