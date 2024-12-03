import React, { useEffect, useRef, useCallback, useState } from "react";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const Sales = () => {
  const [bar_code, setBarCode] = useState("");
  const url = useSelector((state) => state.main.url);

  // Ref to focus the input
  const inputRef = useRef(null);

  // Focus the input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const callForItem = async (scan_code) => {
    try {
      console.log(scan_code);
      setBarCode(scan_code);
      const response = await fetch(`${url}/sales?scan_code=${scan_code}`);
      const data = await response.json();
      console.log(data);
      setBarCode("");
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedCallForItem = useCallback(
    debounce((scan_code) => {
      callForItem(scan_code);
    }, 300),
    []
  );

  return (
    <div>
      <Card className={"p-2 mt-2"}>
        <Heading text={"Sales Order"} />
      </Card>

      <Card className={"p-2 mt-2"}>
        <div className="flex justify-center mt-2">
          <LabInput
            label={"Scan Item"}
            placeholder={"Scan Item"}
            ref={inputRef} // Attach ref to the input
            onChange={(e) => {
              debouncedCallForItem(e.target.value);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Sales;
