import { errorType, Toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { TextField } from "@mui/material";
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

const AddClinic = () => {
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      navigate("/clinics");
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
    const fetchDoctorsByMohArea = async () => {
      try {
        const response = await ClinicService.getDoctorsByMohAreaAndDistrict(
          district,
          area
        );
        setDoctors(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    if (area && district) {
      fetchDoctorsByMohArea();
    }

    setDoctors([]);
  }, [area, district]);

  return (
    <div className="content-container">
      <div>
        <Heading title={"Add New Clinic"} />

        <div className="flex justify-center">
          <div className=" w-8/12 py-12 px-36 flex flex-col gap-6 ">
            <TextField
              required
              label={"Clinic Name"}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name || ""}
              variant="standard"
            />

            <GetRegion
              district={district}
              setDistrict={setDistrict}
              area={area}
              setArea={setArea}
              region={region}
              setRegion={setRegion}
              regions={regions}
              setRegions={setRegions}
              size="small"
              variant="standard"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                name="date"
                label="Date"
                value={dayjs(formData.date)}
                onChange={(e) => {
                  formData.date = e;
                }}
                variant="standard"
              />
            </LocalizationProvider>

            <div className="flex justify-between">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  required
                  label="Start Time"
                  name="startTime"
                  value={dayjs(formData.startTime)}
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
                  value={dayjs(formData.endTime)}
                  onChange={(e) => {
                    formData.endTime = e;
                  }}
                  variant="standard"
                />
              </LocalizationProvider>
            </div>

            {doctors.length > 0 && (
              <MultipleSelectChip
                users={doctors}
                personName={assignedDoctors}
                setPersonName={setAssignedDoctors}
              />
            )}

            <TextField
              label="Other Details"
              name="other"
              value={formData.other}
              onChange={handleInputChange}
              error={!!errors.other}
              helperText={errors.other || ""}
              variant="standard"
            />
            <div className="flex justify-between">
              <Button
                className="self-center bg-[#620084] mt-5"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button className="self-center bg-red-600 mt-5">
                Delete the Record
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClinic;
