import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LabInput } from "./LabInput";
import Heading from "./Heading";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent className="h-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            <Heading text="Search Item" />
          </AlertDialogTitle>
          <AlertDialogTitle className="text-center">
            <LabInput
              label="Search"
              onChange={(e) => console.log(e.target.value)}
              placeholder="Search Item"
              type="text"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full flex">
              <p className="w-[20%] border-2 border-r-0 text-center p-1">
                Item Code
              </p>
              <p className="w-[60%] border-2 border-r-0 text-center p-1">
                Item Name
              </p>
              <p className="w-[20%] border-2 text-center p-1">Item Status</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
