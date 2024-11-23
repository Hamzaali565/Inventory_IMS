import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
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
}
interface UnitItem {
  unit_id: number;
  unit_name: string;
  status: string;
}

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dataI?: Array<DataItem>;
  placeholder: string;
  headerCode: string;
  headerName: string;
  headerStatus: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  dataI,
  placeholder,
  headerCode,
  headerName,
  headerStatus,
}) => {
  const [data, setData] = useState(dataI);
  const [copyData, setCopyData] = useState(dataI);
  const [toggle, setToggle] = useState(false);
  const url = useSelector((state: RootState) => state.main.url);
  console.log(url);

  useEffect(() => {
    if (isOpen) {
      getUnits();
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

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="h-[83%] overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
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
              className="border-2 h-[220%] overflow-y-auto scrollbar-hide"
              style={{}}
            >
              {data &&
                data.map((items, index) => (
                  <div className="w-full flex mt-2" key={index}>
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
            <div className="flex justify-center mt-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
