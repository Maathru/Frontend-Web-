import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Popup from "reactjs-popup";
import { Button } from "./ui/button";

const ClinicAddPopup = () => {
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    setBackendError("");
  };

  const validateField = (name, value) => {
    switch (name) {
      case "date":
        if (!value) return "Date is required";
        break;
      case "name":
        if (!value) return "Clinic name is required";
        break;
      case "startTime":
        if (!value) return "Start time is required";
        break;
      case "endTIime":
        if (!value) return "End time is required";
        break;

      default:
        break;
    }
    return "";
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    return newErrors;
  };

  return (
    <Popup
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
        setBackendError("");
      }}
      trigger={
        <p className="text-sm text-footer-purple hover:cursor-pointer">
          Add New Clinic Schedule
        </p>
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
              label="Clinic Name"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name || ""}
            ></TextField>
            <TextField
              required
              size="small"
              type="date"
              name="date"
              label="Choose Date"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={!!errors.date}
              helperText={errors.date || ""}
            ></TextField>

            <TextField
              type="time"
              name="startTime"
              required
              size="small"
              label="Start Time"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={!!errors.startTime}
              helperText={errors.startTime || ""}
            ></TextField>
            <TextField
              type="time"
              name="endTime"
              required
              size="small"
              label="End Time"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={!!errors.endTime}
              helperText={errors.endTime || ""}
            ></TextField>

            <FormControl size="small">
              <InputLabel shrink>Select the Region</InputLabel>

              <Select
                label="Select the Clinic"
                name="region"
                notched
                onChange={handleInputChange}
              >
                <MenuItem>Region 01</MenuItem>
                <MenuItem>Region 02</MenuItem>
                <MenuItem>Region 03</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel shrink="true">Select the Doctor</InputLabel>

              <Select
                notched
                name="doctor"
                label="Select the Clinic"
                onChange={handleInputChange}
              >
                <MenuItem>Dr Saman</MenuItem>
                <MenuItem>Dr Ajith</MenuItem>
                <MenuItem>Dr Kamal</MenuItem>
              </Select>
            </FormControl>
            <Button className="px-10">Submit</Button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ClinicAddPopup;
