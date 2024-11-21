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

const ClinicAddPopup = ({
  isOpen,
  setIsOpen,
  setIsFetch,
  isDisabled,
  formData,
  setFormData,
  setIsDisabled,
}) => {
  const [errors, setErrors] = useState({});
  const [regions, setRegions] = useState([]);
  const [doctors, setDoctors] = useState([]);

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

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    if (!formData.doctors.length) {
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
      setIsFetch((prev) => !prev);
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
      if (!regions.length > 0) {
        try {
          const response = await ClinicService.getRegions();
          setRegions(response);
        } catch (error) {
          Toast(error.response.data || "Unauthorized", errorType.ERROR);
          console.log(error.response.data);
        }
      }
    };

    const fetchDoctors = async () => {
      if (!doctors.length > 0) {
        try {
          const response = await ClinicService.getDoctors();
          setDoctors(response);
        } catch (error) {
          Toast(error.response.data || "Unauthorized", errorType.ERROR);
          console.log(error.response.data);
        }
      }
    };

    return () => {
      if (isOpen) {
        fetchRegions();
        fetchDoctors();
      }
    };
  }, [isOpen]);

  return (
    <Popup
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
        setFormData({
          name: "",
          region: "",
          date: "",
          startTime: "",
          endTime: "",
          doctors: [],
          other: "",
        });
        setIsDisabled(false);
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
              aria-label="Close"
              onClick={close}
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-center pb-5">
              {formData.clinicId
                ? isDisabled
                  ? `Clinic Id-${formData.clinicId}`
                  : `Edit Clinic Id-${formData.clinicId}`
                : "Add New Clinic Schedule"}
            </p>
          </div>
          <div className="px-10 flex flex-col gap-6 pb-6">
            <TextField
              disabled={isDisabled}
              required
              size="small"
              name="name"
              label="Clinic Name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name || ""}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={isDisabled}
                required
                size="small"
                name="date"
                label="Choose Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date ? dayjs(formData.date) : null}
                onChange={(e) => {
                  const selectedDate = dayjs(e);
                  formData.date = selectedDate.add(1, "day").toDate();
                }}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                disabled={isDisabled}
                required
                label="Start Time"
                name="startTime"
                value={formData.startTime ? dayjs(formData.startTime) : null}
                onChange={(e) => {
                  formData.startTime = e;
                }}
                variant="standard"
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                disabled={isDisabled}
                required
                label="End Time"
                name="endTime"
                value={formData.endTime ? dayjs(formData.endTime) : null}
                onChange={(e) => {
                  formData.endTime = e;
                }}
                variant="standard"
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>

            <FormControl size="small">
              <InputLabel>Select the Region</InputLabel>

              <Select
                disabled={isDisabled}
                name="region"
                value={formData.region || ""}
                onChange={handleInputChange}
              >
                {regions.length > 0 ? (
                  regions.map((r, index) => (
                    <MenuItem key={index} value={r.regionId || ""}>
                      {formatDisplayName(r.regionName)}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No regions available</MenuItem>
                )}
              </Select>
            </FormControl>

            <MultipleSelectChip
              isDisabled={isDisabled}
              users={doctors}
              personName={formData.doctors}
              setPersonName={(val) =>
                setFormData({ ...formData, doctors: val })
              }
            />

            <TextField
              disabled={isDisabled}
              type="text"
              name="other"
              size="small"
              label="Other"
              value={formData.other}
              onChange={handleInputChange}
              error={!!errors.other}
              helperText={errors.other || ""}
            ></TextField>

            {isDisabled ? (
              <Button onClick={() => setIsDisabled(false)} className="px-10">
                Edit
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="px-10">
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ClinicAddPopup;
