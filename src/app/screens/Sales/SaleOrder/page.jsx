import React, { useEffect, useRef, useCallback, useState } from "react";
import { Card } from "@/app/components/Card";
import Heading from "@/app/components/Heading";
import { LabInput } from "@/app/components/LabInput";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
const Sales = () => {
  const [bar_code, setBarCode] = useState(""); // Input value
  const url = useSelector((state) => state.main.url);

  // Ref to focus the input
  const inputRef = useRef(null);
  const errorSound = new Audio("/audio/ErrorMessage.mp3");
  // Focus the input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const callForItem = async (scan_code) => {
    try {
      console.log("Scan Code:", scan_code);
      const response = await fetch(`${url}/sales?scan_code=${scan_code}`);
      const data = await response.json();
      console.log("Response:", data);

      // Clear the input after fetching
      setBarCode("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.log("Error:", error);
      setBarCode("");
      errorSound.play();
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
            value={bar_code} // Bind input to state
            onChange={(e) => {
              const value = e.target.value;
              setBarCode(value); // Update input state
              debouncedCallForItem(value); // Trigger debounced call
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Sales;
