import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

const Stock = () => {
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [data, setData] = useState([
    {
      item_name: "",
      item_id: 0,
      batch_no: "",
      batch_qty: 0,
      input_type: "Physical Stock Taking",
      location: location ? location?.name : "",
      location_id: location ? location?.code : "",
      expiry: "",
    },
  ]);

  const reset = () => {
    setLocation(null);
    setModalIndex(0);
    setData([
      {
        item_name: "",
        item_id: 0,
        batch_no: "",
        batch_qty: 0,
        input_type: "Physical Stock Taking",
        location: location ? location?.name : "",
        location_id: location ? location?.code : "",
        expiry: "",
      },
    ]);
  };

  const url = useSelector((state) => state.main.url);

  const handleOpenItem = (open, index) => {
    setIsItemOpen(open);
    setModalIndex(index);
  };
  const handleOpenLocaion = (open) => {
    setOpenLocation(open);
  };
  const openModal = (index) => {
    console.log(index);

    setIsItemOpen(true);
    setModalIndex(index);
  };
  const handleRow = (rowIndex, type) => {
    if (type === "add") {
      setData((prevData) => [
        ...prevData,
        {
          item_name: "",
          item_id: 0,
          batch_no: "",
          batch_qty: 0,
          input_type: "Physical Stock Taking",
          location: location?.name,
          location_id: location?.code,
          expiry: "",
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

  const updateForItem = (value, key) => {
    let updatedData = data.map((item, itemIndex) => {
      if (itemIndex === modalIndex) {
        if (key === "item_name") {
          return {
            ...item,
            item_name: value.name,
            item_id: value.code,
            batch_no: value?.name,
          };
        }
      }
      return item;
    });
    console.log(updatedData);
    setData(updatedData);
  };

  const updateValues = (value, index, key) => {
    const updateInputs = data.map((items, itemIndex) => {
      if (itemIndex === index) {
        return { ...items, [key]: value };
      }
      return items;
    });
    setData(updateInputs);
  };

  const updateLocation = async (value) => {
    setLocation(value);
    const updateLocation = data.map((items) => ({
      ...items,
      location: value?.name,
      location_id: value?.code,
    }));
    setData(updateLocation);
    console.log(location.name);
  };

  const downloadExcelFile = (value) => {
    if (!location) return console.log("please select location,");

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
    saveAs(blob, "Physical Stock Input.xlsx");
    setOpen(false);
  };

  const uploadExcel = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file.name.includes("Physical Stock Input")) {
      console.log("File should be Physical Stock Taking");
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
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);

        setData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const allItems = async () => {
    try {
      if (!location) return console.log("Please select a location");
      const response = await fetch(`${url}/item`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const responseData = await response.json();
      console.log("responseData", responseData);

      const formattedData = responseData?.data?.data.map((items) => ({
        item_name: items?.item_name,
        item_id: items?.item_id,
        batch_no: items?.item_name,
        batch_qty: 0,
        input_type: "Physical Stock Taking",
        location: location?.name,
        location_id: location?.code,
        expiry: "2035-12-31",
        category: items?.category,
        categort_id: items?.category_id,
        unit_name: items?.item_unit,
        unit_id: items?.unit_id,
      }));
      downloadExcelFile(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const removeDuplicates = async () => {
    const Duplicate = data.filter((items, index, array) => {
      return (
        array.findIndex((item) => item.item_id === items.item_id) == index &&
        items.batch_qty !== 0
      );
    });
    submitData(Duplicate);
  };

  const submitData = async (authenticData) => {
    try {
      console.log(authenticData);

      const response = await fetch(`${url}/stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: authenticData }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(await response.json());
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Card className="p-3 mt-2">
        <Heading text={"Physical Stock Setup"} />
      </Card>
      <Card className={"mt-3 p-2 flex flex-col space-y-4"}>
        <LabInput
          disabled={true}
          label={"Location:"}
          placeholder={"Location name"}
          value={location?.name || ""}
        />
        <Button
          text={"Select Location"}
          classNameText={"w-48"}
          onClick={() => setOpenLocation(true)}
        />
        {location !== null && (
          <Button
            onClick={allItems}
            text={"Downlaod Excel"}
            classNameText={"w-48"}
          />
        )}
        {location !== null && (
          <LabInput
            label={"Select File"}
            type={"file"}
            onChange={(e) => uploadExcel(e)}
            accept={".xlsx, xls"}
          />
        )}
        <div className="flex justify-center space-x-3">
          <Button
            onClick={removeDuplicates}
            text={"Save"}
            classNameText={"w-48"}
          />

          <Button
            onClick={() => reset()}
            text={"Reset"}
            classNameText={"w-48"}
          />
        </div>
      </Card>
      <Card className={"p-2 mt-3"}>
        <div className="flex border-2 ">
          <p className="w-[10%] text-center border-r-2">Select Item</p>
          <p className="w-[20%] text-center border-r-2">Item Name</p>
          <p className="w-[20%] text-center border-r-2">Batch Name</p>
          <p className="w-[20%] text-center border-r-2">Quantity</p>
          <p className="w-[20%] text-center border-r-2">Expiry</p>
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
                  inpStyle={"p-1"}
                  value={item?.item_name}
                />
              </p>
              <p className="w-[20%] border-r-2 flex justify-center">
                <LabInput
                  placeholder={"Batch No"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={"p-1"}
                  value={item?.batch_no}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "batch_no")
                  }
                />
              </p>
              <p className="w-[20%] text-center border-r-2 flex justify-center">
                {" "}
                <LabInput
                  placeholder={"Quantity"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  inpStyle={"p-1"}
                  type={"number"}
                  value={item?.batch_qty}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "batch_qty")
                  }
                />
              </p>
              <p className="w-[20%] text-center border-r-2 flex justify-center">
                {" "}
                <LabInput
                  placeholder={"Select Expiry"}
                  disabled={false}
                  mainStyle={"w-[100%] mt-0"}
                  type={"date"}
                  inpStyle={"p-1"}
                  value={item?.expiry}
                  onChange={(e) =>
                    updateValues(e.target.value, index, "expiry")
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
        isOpen={isItemOpen}
        onOpenChange={handleOpenItem}
        headerCode="Item Code"
        headerName="Item Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => updateForItem(data, "item_name")}
      />
      <Modal
        isOpen={openLocation}
        onOpenChange={handleOpenLocaion}
        headerCode="location Code"
        headerName="Location Name"
        headerStatus="Status"
        placeholder="Search"
        onClick={(data) => updateLocation(data, "location_name")}
      />
    </div>
  );
};

export default Stock;