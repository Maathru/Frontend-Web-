import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const RegionAddPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Region name is required";
        break;
      case "areas":
        if (!value) return "MOH areas are required";
        break;
      case "population":
        if (!value) return "Population is required";
        break;
      default:
        break;
    }
    return "";
  };

  return (
    <div className="flex justify-end">
      <Popup
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => {
          setIsOpen(false);
          setBackendError("");
        }}
        trigger={
          <Button className="bg-[#6F0096] h-10 flexbox items-center ">
            Add New
            <HiOutlinePlusSm className="ml-2 h-5 w-5" />
          </Button>
        }
        modal
        nested
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {(close) => (
          <div className=" bg-white dark:bg-dark-popup w-96 rounded-md">
            <div className="flex justify-end pt-2 px-2">
              <IoIosCloseCircleOutline
                size={25}
                className="cursor-pointer hover:text-purple-500 hover:scale-110"
                onClick={close}
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-center pb-5">
                Add New Clinic
              </p>
            </div>

            <div className="px-10 flex flex-col gap-6 pb-6">
              <TextField
                required
                size="small"
                name="name"
                label="Region Name"
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name || ""}
              ></TextField>
              <TextField
                required
                size="small"
                name="population"
                label="Population"
                onChange={handleInputChange}
                error={!!errors.date}
                helperText={errors.date || ""}
              ></TextField>
              <TextField
                required
                size="small"
                name="areas"
                label="MOH Areas under the Division"
                onChange={handleInputChange}
                error={!!errors.date}
                helperText={errors.date || ""}
              ></TextField>

              <FormControl size="small">
                <InputLabel>Assign Midwife</InputLabel>

                <Select
                  label="Assign Midwife"
                  name="midwife"
                  notched
                  onChange={handleInputChange}
                >
                  <MenuItem>Midwife 01</MenuItem>
                  <MenuItem>Midwife 02</MenuItem>
                  <MenuItem>Midwife 03</MenuItem>
                </Select>
              </FormControl>

              <Button className="px-10">Submit</Button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default RegionAddPopup;
