import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { TextField } from "@mui/material";
import { useState } from "react";

const EligiblePopup = ({addButton}) => {
  const [errors, setErrors] = useState({});
  const [showExisting, setShowExisting] = useState(false);
  const [showNew, setShowNew] = useState(false);
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
      default:
        break;
    }
    return "";
  };

  return (
    <Popup
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
      <div className="bg-white dark:bg-dark-popup w-fit p-10 rounded-md">
        <p className="m-10 mt-0 text-xl font-semibold">
          Existing User or new couple?
        </p>
        {!showExisting && !showNew && (
          <div className="buttons flex gap-12 w-full justify-center">
            <Button className="" onClick={() => setShowExisting(true)}>
              Existing
            </Button>
            <Button onClick={() => setShowNew(true)}>New</Button>
          </div>
        )}
        {showExisting && (
          <div className="existing flex flex-col items-center gap-8">
            <TextField
              label="Email Address"
              type="email"
              required
              variant="standard"
              fullWidth
              name="email"
              onChange={handleInputChange}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
              // className="rounded"
            ></TextField>

            <Button className="px-10">Submit</Button>
          </div>
        )}
        {showNew && (
          <div className="new flex flex-col items-center gap-8">
            <TextField
              label="First Name"
              required
              variant="standard"
              fullWidth
              name="firstName"
              onChange={handleInputChange}
              error={errors.firstName ? true : false}
              helperText={errors.firstName ? errors.firstName : ""}
            ></TextField>
            <TextField
              label="Last Name"
              required
              variant="standard"
              fullWidth
              name="lastName"
              onChange={handleInputChange}
              error={errors.lastName ? true : false}
              helperText={errors.lastName ? errors.lastName : ""}
            ></TextField>
            <TextField
              label="Email Address"
              type="email"
              required
              variant="standard"
              fullWidth
              name="email"
              onChange={handleInputChange}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
            ></TextField>

            <Button className="px-10">Submit</Button>
          </div>
        )}
      </div>
    </Popup>
  );
};

export default EligiblePopup;
