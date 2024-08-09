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
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
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
        if (!value) return "Email address is required";
        break;
      case "phone":
        if (!value) return "Phone number is required";
        break;
      case "nic":
        if (!value) return "NIC number is required";
        break;
      case "address1":
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
                //   value={formData.firstName}
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
                //   value={formData.lastName}
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
              //   value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email ? errors.email : ""}
            />
            <TextField
              required
              fullWidth
              label={phone}
              name="phone"
              variant="standard"
              //   value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone : ""}
            />
            <TextField
              required
              fullWidth
              label={nic}
              name="nic"
              variant="standard"
              //   value={formData.nic}
              onChange={handleInputChange}
              error={!!errors.nic}
              helperText={errors.nic ? errors.nic : ""}
            />
            <FormControl required>
              <InputLabel sx={{ left: "-10px" }}>Select Designation</InputLabel>

              <Select label={designation} name="designation" variant="standard">
                <MenuItem>Midwife</MenuItem>
                <MenuItem>Doctor</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              label={address1}
              name="address1"
              variant="standard"
              fullWidth
              //   value={formData.address1}
              onChange={handleInputChange}
              error={!!errors.address1}
              helperText={errors.address1 ? errors.address1 : ""}
            />
            <div className="flex gap-8">
              <TextField
                required
                label={street}
                name="street"
                variant="standard"
                fullWidth
                //   value={formData.street}
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
                //   value={formData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city ? errors.city : ""}
              />
            </div>

            <Button className="my-6 mx-24 bg-footer-purple">
              Save Details
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default UserAddPopup;
