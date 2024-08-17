import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTitle } from "@/hooks/useTitle";
import { errorType, Toast } from "./toast";
import RegionService from "@/service/regionService";
import EmployeeService from "@/service/employeeService";

// const formatDisplayName = (value) => {
//   return value
//     .split("_")
//     .map((word) => word.toLowerCase())
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

const RegionAddPopup = ({
  isOpen,
  setIsOpen,
  addButton,
  regionName,
  population,
  midwife,
}) => {
  useTitle("Add Region");
  const [errors, setErrors] = useState({});
  const [midwives, setMidwives] = useState([]);
  const [formData, setFormData] = useState({
    regionName: "",
    midwife: "",
    population: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "regionName":
        if (!value) return "Region name is required";
        break;
      case "population":
        if (!value) return "Population is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await RegionService.addRegion(formData);

      setFormData({
        regionName: "",
        midwife: "",
        population: "",
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
    const fetchMidwives = async () => {
      try {
        const response = await EmployeeService.getMidwives();
        console.log(response);
        setMidwives(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    if (isOpen) {
      fetchMidwives();
    }
  }, [isOpen]);

  return (
    <div className="flex justify-end">
      <Popup
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => {
          setIsOpen(false);
          setFormData({
            regionName: "",
            population: "",
            midwife: "",
          });
          // setBackendError("");
        }}
        trigger={
          <Button className="bg-[#6F0096] h-10 flexbox items-center ">
            {addButton}
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
                Add New Region
              </p>
            </div>

            <div className="px-10 flex flex-col gap-6 pb-6">
              <TextField
                required
                size="small"
                name="regionName"
                label={regionName}
                value={formData.regionName}
                onChange={handleInputChange}
                error={!!errors.regionName}
                helperText={errors.regionName || ""}
              ></TextField>
              <TextField
                required
                size="small"
                name="population"
                label={population}
                value={formData.population}
                onChange={handleInputChange}
                error={!!errors.population}
                helperText={errors.population || ""}
              ></TextField>

              <FormControl size="small">
                <InputLabel id="select-label">{midwife}</InputLabel>

                <Select
                  id="select-label"
                  label={midwife}
                  name="midwife"
                  value={formData.midwife || ""}
                  onChange={handleInputChange}
                >
                  {midwives.length > 0 ? (
                    midwives.map((m, index) => (
                      <MenuItem key={index} value={m.id || ""}>
                        {m.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No midwives available</MenuItem>
                  )}
                </Select>
              </FormControl>

              <Button className="px-10" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default RegionAddPopup;
