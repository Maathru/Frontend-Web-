import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { errorType, Toast } from "@/components/toast";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import MultipleSelectChip from "@/components/userComponents/MultipleSelectChip";
import ClinicService from "@/service/clinicService";

const formatDisplayName = (value) => {
  return value
    .split("_")
    .map((word) => word.toLowerCase())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ClinicAddPopup = () => {
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [assignedDoctors, setAssignedDoctors] = useState([]);
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
    setFormData({ ...formData, doctors: assignedDoctors });

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    if (!assignedDoctors) {
      Toast("Please select doctors", errorType.ERROR);
      return;
    }

    if (!formData.region) {
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
      setIsOpen(false);
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
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await ClinicService.getDoctors();
        setDoctors(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    if (isOpen) {
      fetchRegions();
      fetchDoctors();
    }
  }, [isOpen]);

  return (
    <Popup
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
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
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name || ""}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                size="small"
                name="date"
                label="Choose Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date ? dayjs(formData.date) : null}
                onChange={(e) => {
                  formData.date = e;
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                required
                label="Start Time"
                name="startTime"
                value={formData.startTime ? dayjs(formData.startTime) : null}
                onChange={(e) => {
                  formData.startTime = e;
                }}
                variant="standard"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                required
                label="End Time"
                name="endTime"
                value={formData.endTime ? dayjs(formData.endTime) : null}
                onChange={(e) => {
                  formData.endTime = e;
                }}
                variant="standard"
              />
            </LocalizationProvider>

            <FormControl size="small">
              <InputLabel shrink={true}>Select the Region</InputLabel>

              <Select notched={true} name="region" onChange={handleInputChange}>
                {regions.length > 0 ? (
                  regions.map((r) => (
                    <MenuItem key={r.regionId} value={r.regionId || ""}>
                      {formatDisplayName(r.regionName)}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No regions available</MenuItem>
                )}
              </Select>
            </FormControl>

            <MultipleSelectChip
              users={doctors}
              personName={assignedDoctors}
              setPersonName={setAssignedDoctors}
            />

            <TextField
              type="text"
              name="other"
              required
              size="small"
              label="Other"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={!!errors.other}
              helperText={errors.other || ""}
            ></TextField>
            <Button onClick={handleSubmit} className="px-10">
              Submit
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ClinicAddPopup;
