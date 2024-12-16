"use client";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Loader from "@/app/components/Loader";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [item_id, setitem_id] = useState(0);
  const [exceldata, setExcelData] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState({
    item_name: "",
    item_unit: "",
    unit_id: 0,
    category: "",
    category_id: 0,
    p_price: 0,
    s_price: 0,
    c_user: "Hamza",
    p_size_status: false,
    p_size_qty: 0,
    p_price_per_size: 0,
    s_price_per_size: 0,
    scan_code: "",
  });

  const url = useSelector((state) => state.main.url);

  const reset = () => {
    setItemDetail({
      item_name: "",
      item_unit: "",
      unit_id: 0,
      category: "",
      category_id: 0,
      p_price: 0,
      s_price: 0,
      c_user: "Hamza",
      p_size_status: false,
      p_size_qty: 0,
      p_price_per_size: 0,
      s_price_per_size: 0,
      scan_code: 0,
    });
    setitem_id(0);
    setExcelData([]);
  };

  const updateItemDetails = (value, iKey) => {
    // Use for...in loop to iterate through keys in newValues
    console.log(value);
    if (typeof value === "object") {
      if (iKey === "category") {
        setItemDetail((previtems) => ({
          ...previtems,
          category: value?.name,
          category_id: value?.code,
        }));
        return;
      }
      setItemDetail((previtems) => ({
        ...previtems,
        item_unit: value?.name,
        unit_id: value?.code,
      }));
      return;
    }
    if (iKey === "p_size_status") {
      if (itemDetail?.s_price === 0 || itemDetail?.p_price === 0) {
        alert("Please enter purchase price and sale price first !!!");
        return;
      } else {
        setItemDetail((previtems) => ({
          ...previtems,
          p_size_status: value,
          p_size_qty: 0,
          p_price_per_size: 0,
          s_price_per_size: 0,
        }));
        return;
      }
    }

    if (iKey === "p_size_qty") {
      setItemDetail((prevItem) => ({
        ...prevItem,
        p_size_qty: value,
        p_price_per_size: prevItem?.p_price / value,
        s_price_per_size: prevItem?.s_price / value,
      }));
    }

    setItemDetail((prevValue) => ({
      ...prevValue,
      [iKey]: typeof value === "string" ? value.toUpperCase() : +value,
    }));
    console.log(itemDetail);
  };

  const updateForItem = (value) => {
    console.log(value);

    setItemDetail((prevValue) => ({
      ...prevValue,
      item_name: value?.name,
      item_unit: value?.item_unit,
      unit_id: value?.unit_id,
      category: value?.category,
      category_id: value?.category_id,
      p_price: value?.p_price,
      s_price: value?.s_price,
      p_size_status: value?.p_size_status,
      p_size_qty: value?.p_size_qty,
      p_price_per_size: value?.p_price_per_size,
      s_price_per_size: value?.s_price_per_size,
      scan_code: value?.scan_code,
    }));
    setitem_id(value.code);
  };

  const handleOpenChange = (open) => {
    setIsModalOpen(open);
  };
  const handleOpenCategory = (open) => {
    setIsCategoryOpen(open);
  };
  const handleOpenItem = (open) => {
    setIsItemOpen(open);
  };

  const submitItem = async () => {
    try {
      for (const key in itemDetail) {
        if (itemDetail[key] === "") {
          alert("Please fill all fields");
          return;
        }
      }
      setOpen(true);
      const response = await fetch(`${url}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemDetail),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(await response.json());
      alert(`Item Created Successfully ✨✨✨`);
      setOpen(false);
      reset();
    } catch (error) {
      alert(`Item Created Failed !!!`);
      setOpen(false);
      console.error(error);
    }
  };

  const updateItem = async () => {
    try {
      const response = await fetch(`${url}/item`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...itemDetail, item_id }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(await response.json());
      alert(`Item updated successfully ✨✨✨`);
      reset();
    } catch (error) {
      alert(`Item updation failed !!!`);
      console.log("error of updateItem", error);
    }
  };

  const excel_format = async () => {
    try {
      const formattedData = [
        {
          item_name: "",
          unit_id: "",
          item_unit: "",
          p_price: "",
          s_price: "",
          category: "",
          category_id: "",
          p_size_status: "",
          p_size_qty: "",
          p_price_per_size: "",
          s_price_per_size: "",
          scan_code: "",
        },
      ];

      downloadExcelFile(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcelFile = (value) => {
    const worksheet = XLSX.utils.json_to_sheet(value);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert to a Blob and download it
    const excelBlob = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBlob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Upload Items.xlsx");
  };

  const uploadExcel = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file.name.includes("Upload Items")) {
      console.log("File should be Upload Items");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet in the Excel file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the worksheet to JSON
        let json = XLSX.utils.sheet_to_json(worksheet);
        json = json.map((items) => ({
          ...items,
          item_name: items?.item_name.toUpperCase(),
          item_unit: items?.item_unit.toUpperCase(),
          category: items?.category.toUpperCase(),
        }));
        console.log(json);
        setExcelData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const upload_excel_to_database = async () => {
    try {
      let response = await fetch(`${url}/upload-excel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ data: exceldata }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      response = await response.json();
      reset();
      console.log(response);
      alert(`Excel Uploaded Successfully 🚀🚀🚀`);
    } catch (error) {
      console.log("error", error);
      alert(`Excel upload failed !!!`);
    }
  };

  return (
    <div>
      <Card className="p-2 m-2">
        <Heading text="Create Items" className="text-3xl" />
      </Card>

      <Card className="p-2 m-2 lg:mt-6">
        <div className="grid grid-cols-3">
          <LabInput
            label="Items Name"
            onChange={(e) => updateItemDetails(e.target.value, "item_name")}
            placeholder="Enter item name"
            type="text"
            value={itemDetail?.item_name}
          />
          <LabInput
            label="Bar Code"
            onChange={(e) => updateItemDetails(e.target.value, "scan_code")}
            placeholder="Scan bar code"
            type="text"
            value={itemDetail?.scan_code}
          />
          <LabInput
            label="Purchase Price"
            onChange={(e) => updateItemDetails(+e.target.value, "p_price")}
            placeholder="Enter purchase price"
            type="number"
            value={itemDetail?.p_price}
            disabled={itemDetail?.p_size_status}
          />
          <LabInput
            label="Sale Price"
            onChange={(e) => updateItemDetails(+e.target.value, "s_price")}
            placeholder="Enter sale price"
            type="number"
            value={itemDetail?.s_price}
            disabled={itemDetail?.p_size_status}
          />
          <LabInput
            label="Unit"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Select unit"
            type="text"
            disabled={true}
            value={itemDetail?.item_unit}
          />
          <LabInput
            label="Category"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Select Category"
            type="text"
            disabled={true}
            value={itemDetail?.category}
          />
          <LabInput
            label="Allow Pack Size"
            onChange={(e) =>
              updateItemDetails(e.target.checked, "p_size_status")
            }
            type="checkbox"
            checked={itemDetail?.p_size_status}
          />
          {itemDetail?.p_size_status === true && (
            <LabInput
              label="Pack Size Quantity"
              onChange={(e) => updateItemDetails(+e.target.value, "p_size_qty")}
              placeholder="Pack Size Quantity"
              type="number"
              value={itemDetail?.p_size_qty}
            />
          )}
          <LabInput
            label="Purchase Price Per Item"
            onChange={(e) =>
              updateItemDetails(e.target.value, "p_price_per_size")
            }
            placeholder="Purchase Price Per Item"
            type="number"
            disabled={true}
            value={itemDetail?.p_price_per_size}
          />
          <LabInput
            label="Sale Price Per Item"
            onChange={(e) =>
              updateItemDetails(e.target.value, "s_price_per_size")
            }
            placeholder="Sale Price Per Item"
            type="number"
            disabled={true}
            value={itemDetail?.s_price_per_size}
          />
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          text={"Select Unit"}
          className="mt-3"
          classNameText="w-40"
        />
        <Button
          onClick={() => setIsCategoryOpen(true)}
          text={"Select Category"}
          className="mt-3"
          classNameText="w-40"
        />
        <Button
          onClick={() => setIsItemOpen(true)}
          text={"Update Item"}
          className="mt-3"
          classNameText="w-40"
        />
        <Button
          text={"Download Excel"}
          className="mt-3"
          classNameText="w-40"
          onClick={excel_format}
        />
        <LabInput
          label={"Select File"}
          type={"file"}
          onChange={(e) => uploadExcel(e)}
          accept={".xlsx, xls"}
        />
        <Modal
          isOpen={isModalOpen}
          onOpenChange={handleOpenChange}
          headerCode="Unit Code"
          headerName="Unit Name"
          headerStatus="Status"
          placeholder="Search"
          onClick={(data) => updateItemDetails(data, "object")}
        />
        <Modal
          isOpen={isCategoryOpen}
          onOpenChange={handleOpenCategory}
          headerCode="Category Code"
          headerName="Category Name"
          headerStatus="Status"
          placeholder="Search"
          onClick={(data) => updateItemDetails(data, "category")}
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

        <div className="flex justify-center space-x-2 my-4">
          {exceldata.length === 0 ? (
            <Button
              onClick={() => (item_id === 0 ? submitItem() : updateItem())}
              text={item_id !== 0 ? "Update" : "Save"}
            />
          ) : (
            <Button
              text={"Save Excel"}
              classNameText={"w-40"}
              onClick={upload_excel_to_database}
            />
          )}
          <Button onClick={() => reset()} text="Reset" />
        </div>
      </Card>
      <Loader visible={open} />
    </div>
  );
};

export default Inventory;
