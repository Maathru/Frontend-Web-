import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EmployeeService from "@/service/employeeService";
import { errorType, Toast } from "./toast";

const UserAddPopup = ({
  isOpen,
  setIsOpen,
  addButton,
  firstName,
  lastName,
  email,
  phone,
  nic,
  designation,
  address1,
  street,
  city,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value) return "First name is required";
        break;
      case "lastName":
        if (!value) return "Last name is required";
        break;
      case "email":
          case "email":
           {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return "Email is required";
            if (!emailPattern.test(value)) return "Email is not valid";
           }
            break;
        break;
      case "phoneNumber":
        if (!value) return "Phone number is required";
        break;
      case "nic":
        if (!value) return "NIC number is required";
        break;
      case "addressLine1":
        if (!value) return "Address line 1 is required";
        break;
      case "street":
        if (!value) return "Street is required";
        break;
      case "city":
        if (!value) return "City is required";
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
      const response = await EmployeeService.register(formData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        phoneNumber: "",
        nic: "",
        addressLine1: "",
        street: "",
        city: "",
        designation: "",
        qualifications: "",
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

  return (
    <Popup
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
      }}
      trigger={
        <Button className="bg-[#6F0096] h-10 flexbox items-center">
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
        <div
          className="rounded-md bg-white dark:bg-dark-popup"
          style={{ width: "600px" }}
        >
          <div className="flex flex-row-reverse justify-between pt-5 px-5">
            <IoIosCloseCircleOutline
              size={25}
              className="cursor-pointer hover:text-purple-500 hover:scale-110"
              onClick={close}
            />
          </div>

          <Typography variant="h5" align="center">
            {addButton}
          </Typography>
          <div className="px-10 pb-6 pt-4 flex flex-col gap-6 overflow-y-scroll h-[500px]">
            <div className="flex gap-8">
              <TextField
                required
                fullWidth
                label={firstName}
                name="firstName"
                variant="standard"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName : ""}
              />
              <TextField
                required
                fullWidth
                label={lastName}
                name="lastName"
                variant="standard"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName : ""}
              />
            </div>
            <TextField
              required
              fullWidth
              label={email}
              name="email"
              type="email"
              variant="standard"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email ? errors.email : ""}
            />
            <TextField
              required
              fullWidth
              label={phone}
              name="phoneNumber"
              variant="standard"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber : ""}
            />
            <TextField
              required
              fullWidth
              label={nic}
              name="nic"
              variant="standard"
              value={formData.nic}
              onChange={handleInputChange}
              error={!!errors.nic}
              helperText={errors.nic ? errors.nic : ""}
            />
            <FormControl required>
              <InputLabel sx={{ left: "-10px" }}>Select Role</InputLabel>

              <Select
                label="Select Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                variant="standard"
              >
                <MenuItem value="MIDWIFE">Midwife</MenuItem>
                <MenuItem value="DOCTOR">Doctor</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              label={designation}
              name="designation"
              variant="standard"
              fullWidth
              value={formData.designation}
              onChange={handleInputChange}
              error={!!errors.designation}
              helperText={errors.designation ? errors.designation : ""}
            />
            <TextField
              label="Enter qualifications"
              name="qualifications"
              variant="standard"
              fullWidth
              value={formData.qualifications}
              onChange={handleInputChange}
              error={!!errors.qualifications}
              helperText={errors.qualifications ? errors.qualifications : ""}
            />
            <TextField
              required
              label={address1}
              name="addressLine1"
              variant="standard"
              fullWidth
              value={formData.addressLine1}
              onChange={handleInputChange}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1 ? errors.addressLine1 : ""}
            />
            <div className="flex gap-8">
              <TextField
                required
                label={street}
                name="street"
                variant="standard"
                fullWidth
                value={formData.street}
                onChange={handleInputChange}
                error={!!errors.street}
                helperText={errors.street ? errors.street : ""}
              />

              <TextField
                required
                label={city}
                name="city"
                variant="standard"
                fullWidth
                value={formData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city ? errors.city : ""}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="my-6 mx-24 bg-footer-purple"
            >
              Save Details
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default UserAddPopup;
