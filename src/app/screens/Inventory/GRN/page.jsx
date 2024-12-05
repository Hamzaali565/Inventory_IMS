"use-client";

import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const GRN = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [location, setLocation] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [grn_date, setGrnDate] = useState("");
  const [bill_no, setBillNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.main.url);

  const reset = () => {
    setLocation(null);
    setSupplier(null);
    setGrnDate("");
    setBillNo("");
    setRemarks("");
    setMessage("");
    setData([]);
  };

  //   {
  //     item_id: 0, // done
  //     item_name: "", // done
  //     unit_id: 0, // done
  //     item_unit: "", // done
  //     t_qty: 0, // done
  //     r_qty: 0, // done
  //     p_qty: 0, // done
  //     charges: 0, // done
  //     amount: 0, // done
  //     p_size_status: false, // done
  //     p_size_qty: 0,  // done
  //     p_size_stock: 0,
  //     po_no: 0, // done
  //     batch_no: "",
  //     batch_qty: 0,
  //   },

  const handleOpenLocaion = (open) => {
    setOpenLocation(open);
  };

  const handleOpenSupplier = (open) => {
    setOpenSupplier(open);
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

  const removeRow = (indexValue) => {
    if (data.length === 1) {
      return;
    }
    const filterRow = data.filter((_, index) => index !== indexValue);
    setData(filterRow);
  };

  const handleInputs = (value, key, valIndex) => {
    try {
      let updateData;
      if (message === "grn_transaction_check") {
        updateData = data.map((items, index) => {
          if (index === valIndex) {
            if (key === "r_qty") {
              console.log(message);
              if (value > items?.p_qty || value < 0) {
                throw new Error("hmmm !!!");
              } else {
                return {
                  ...items,
                  [key]: +value,
                  amount: +value * items?.charges,
                  p_size_stock:
                    items?.p_size_qty === 0
                      ? +value
                      : +value * items?.p_size_qty,
                  batch_qty: +value,
                  p_size_qty:
                    items?.p_size_qty === null ? 0 : items?.p_size_qty,
                };
              }
            } else if (key === "charges") {
              if (value < 0) {
                throw new Error("hmmm !!!");
              } else {
                return {
                  ...items,
                  [key]: +value,
                  amount: +value * items?.r_qty,
                };
              }
            }
            return { ...items, [key]: value };
          }
          return items;
        });
        console.log(updateData);
        setData(updateData);
        return;
      }
      ///
      updateData = data.map((items, index) => {
        if (index === valIndex) {
          if (key === "r_qty") {
            if (value > items?.t_qty || value < 0) {
              throw new Error("hmmm !!!");
            } else {
              return {
                ...items,
                [key]: +value,
                amount: +value * items?.charges,
                p_qty: items?.t_qty - +value,
                p_size_stock:
                  items?.p_size_qty === 0 ? +value : +value * items?.p_size_qty,
                batch_qty: +value,
                p_size_qty: items?.p_size_qty === null ? 0 : items?.p_size_qty,
              };
            }
          } else if (key === "charges") {
            if (value < 0) {
              throw new Error("hmmm !!!");
            } else {
              return {
                ...items,
                [key]: +value,
                amount: +value * items?.r_qty,
              };
            }
          }
          return { ...items, [key]: value };
        }
        return items;
      });
      console.log(updateData);
      setData(updateData);
    } catch (error) {
      console.log(error);
    }
  };

  const validation_check = () => {
    try {
      if (!data.length) throw new Error("Please Select PO !!!");
      if (!supplier) throw new Error("Please Select Supplier !!!");
      if (!location) throw new Error("Please Select Location !!!");
      if (!grn_date) throw new Error("Please Select GRN Date !!!");

      let alphaData = data.filter((item) => item?.r_qty !== 0);
      if (alphaData.length === 0) {
        throw new Error("Please Insert Detail of Atleast One Items !!!");
      }

      alphaData.map((items, index) => {
        const { r_qty, charges, batch_no } = items;
        if (r_qty !== 0) {
          if (r_qty <= 0 || charges <= 0 || !batch_no) {
            throw new Error(`Some data missing at line no ${index + 1}`);
          }
        }
        return;
      });

      if (message === "grn_transaction_check") {
        alphaData = alphaData.map((items) => ({
          ...items,
          p_qty: (items?.p_qty || 0) - (items?.r_qty || 0),
        }));

        submitHandler(alphaData);
        return;
      }
      submitHandler(alphaData);
    } catch (error) {
      alert(error.message);
    }
  };

  const submitHandler = async (myData) => {
    try {
      const response = await fetch(`${url}/grn`, {
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
          grnDetails: myData,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let dataRes = await response.json();
      console.log(dataRes);
      reset(alert(`GRN Created Successfully ⚡⚡`));
    } catch (error) {
      console.log(error);
      alert(`GRN creation failed contact to Muhammad Hamza !!!`);
    }
  };

  return (
    <div>
      <Card>
        <Heading text={"Good Receipt Note"} className={"mt-2 text-2xl p-2"} />
      </Card>
      <Card>
        <div className={"grid grid-cols-3 mt-2 p-2"}>
          <Button
            text={"Select PO"}
            classNameText={"w-40"}
            onClick={() => setOpenPO(true)}
          />
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
          <LabInput
            placeholder={"PO Number"}
            disabled={true}
            value={data[0]?.po_no || ""}
          />
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
          <p className="w-[5%] border-2 text-center border-r-0">Po No</p>
          <p className="w-[15%] border-2 text-center border-r-0">Item</p>
          <p className="w-[10%] border-2 text-center border-r-0">Unit</p>
          <p className="w-[10%] border-2 text-center border-r-0">
            Required Qty
          </p>
          <p className="w-[10%] border-2 text-center border-r-0">Pending Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">Recieve Qty</p>
          <p className="w-[10%] border-2 text-center border-r-0">Charges</p>
          <p className="w-[10%] border-2 text-center border-r-0">Amount</p>
          <p className="w-[10%] border-2 text-center border-r-0">Batch No</p>
          <p className="w-[10%] border-2 text-center ">Rem</p>
        </div>
        {data.length !== 0 &&
          data?.map((items, index) => (
            <div className="flex justify-between items-center" key={index}>
              <p className="w-[5%] border-2 text-center text-sm border-r-0 p-1">
                {items?.po_no}
              </p>
              <p
                className={`${
                  items?.p_size_status === 1 ? "text-green-600 font-bold" : ""
                } w-[15%] border-2 text-center text-sm border-r-0 p-1`}
              >
                {items?.item_name}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                {items?.item_unit}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                {items?.t_qty}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                {items?.p_qty}
              </p>
              <p className="w-[10%] border-2 text-center text-sm border-r-0 p-1">
                <input
                  type="number"
                  className="w-20 rounded-2xl pl-2 bg-gray-500 placeholder:text-[11px] placeholder:pl-1"
                  placeholder="Receive Qty"
                  onChange={(e) => handleInputs(e.target.value, "r_qty", index)}
                  value={items?.r_qty}
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

              <p
                className="w-[10%] border-2 text-center text-sm p-1 font-bold text-red-600 cursor-pointer"
                onClick={() => console.log(index)}
              >
                ---
              </p>
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
    </div>
  );
};

export default GRN;
