import React, { useState } from "react";
import { TextField } from "@mui/material";
import { HiChevronLeft } from "react-icons/hi";

const drugAdd = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  return (
    <div>
      <div>
        <div className="text-3xl text-[#5B5B5B] font-semibold ">
          <HiChevronLeft className="text-5xl inline" />
          Drug Management
        </div>

        <div className="grid">
          <div className="bg-[#FAEDFF] w-11/12 h-">
            <TextField
              required
              value={name}
              onChange={handleNameChange}
              error={nameError}
              label="Name"
              helperText={nameError ? "Cannot be empty" : ""}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default drugAdd;
