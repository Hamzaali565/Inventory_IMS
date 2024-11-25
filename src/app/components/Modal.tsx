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
import { RootState } from "@/Store/store";

interface DataItem {
  code: number;
  name: string;
  status: string;
  item_unit: string;
  unit_id: number;
  category_name: string;
  category_id: number;
  p_price: number;
  s_price: number;
  c_user: string;
}

interface UnitItem {
  unit_id: number;
  unit_name: string;
  status: string;
}
interface CategoryItem {
  id: number;
  category_name: string;
  status: string;
}
interface Item {
  item_id: number;
  item_name: string;
  status: string;
  item_unit: "";
  unit_id: 0;
  category_name: "";
  category_id: 0;
  p_price: 0;
  s_price: 0;
}

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dataI?: Array<DataItem>;
  placeholder: string;
  headerCode: string;
  headerName: string;
  headerStatus: string;
  onClick: (item: { name: string; code: number; status: string }) => void;
}

const Modal: React.FC<ModalProps> = ({
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
  const url = useSelector((state: RootState) => state.main.url);

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
      const structuredData: { code: number; name: string; status: string }[] =
        units.data.data.map((items: UnitItem) => ({
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
      const structuredData: { code: number; name: string; status: string }[] =
        category.data.data.map((items: CategoryItem) => ({
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
      const structuredData: {
        code: number;
        name: string;
        status: string;
        c_user: string;
      }[] = category.data.data.map((items: Item) => ({
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

  const filterNames = (input: string) => {
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

  const sendToParent = (item: {
    name: string;
    code: number;
    status: string;
    item_unit: string;
    unit_id: number;
    category_name: string;
    category_id: number;
    p_price: number;
    s_price: number;
  }) => {
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
            <div className="w-full flex">
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
                    className="w-full flex mt-2"
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
