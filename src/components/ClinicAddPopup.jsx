import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import GetRegion from "@/components/userComponents/getRegion";
import MultipleSelectChip from "@/components/userComponents/MultipleSelectChip";
import ClinicService from "@/service/clinicService";

const ClinicAddPopup = () => {
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [assignedDoctors, setAssignedDoctors] = useState([]);
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [region, setRegion] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    date: "",
    startTime: "",
    endTime: "",
    doctors: [],
    other: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Clinic name is required";
        break;
      case "date":
        if (!value) return "Date is required";
        {
          const clinicDate = new Date(value);
          if (clinicDate < new Date())
            return "Date must be in the today or future";
        }
        break;
      case "startTime":
        if (!value) return "Start time is required";
        break;
      case "endTime":
        if (!value) return "End time is required";
        break;
      case "doctors":
        if (value.length < 1) return "Doctors are required";
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
      if (error) {
        newErrors[key] = error;
        Toast(error, errorType.ERROR);
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(region);
    setFormData({ ...formData, region: region, doctors: assignedDoctors });

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    if (!region) {
      Toast("Please select a region", errorType.ERROR);
      return;
    }

    try {
      const response = await ClinicService.addClinic(formData);

      setFormData({
        name: "",
        region: "",
        date: "",
        startTime: "",
        endTime: "",
        doctors: [],
        other: "",
      });
      Toast(response, errorType.SUCCESS);
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.map((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });

          setErrors(newErrors);
        } else {
          console.log(data);
          Toast(data || "Error occurred", errorType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await ClinicService.getRegions();
        setRegions(response);
        console.log(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await ClinicService.getDoctors();
        setDoctors(response);
        console.log(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    if (isOpen) {
      fetchRegions();
      fetchDoctors();
    }

    setDoctors([]);
  }, [isOpen]);

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
