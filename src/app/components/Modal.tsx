import React, { useState } from "react";
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

interface DataItem {
  code: string;
  name: string;
  status: string;
}

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dataI: Array<DataItem>;
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

  const filterNames = (input: string) => {
    const searchTerm = input.toLowerCase();
    // if (input === "") {
    //   setToggle(!toggle);
    //   return;
    // }

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
    setData(filteredData);
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
              className="border-2 h-[48%] overflow-y-auto scrollbar-hide"
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
