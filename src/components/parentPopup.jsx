import { Alert } from "flowbite-react";
import { IoIosCloseCircleOutline, IoMdArrowBack } from "react-icons/io";
import { Button } from "./ui/button";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { HiOutlinePlusSm } from "react-icons/hi";

const parentPopup = ({ addButton }) => {
  const [title, setTitle] = useState("Existing User or new couple?");
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showExisting, setShowExisting] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowNew(false);
      setShowExisting(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    // setBackendError({ ...backendError, msg: "" });
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

  //   const validate = () => {
  //     const newErrors = {};

  //     Object.keys(formData).forEach((key) => {
  //       const error = validateField(key, formData[key]);
  //       if (error) newErrors[key] = error;
  //     });

  //     return newErrors;
  //   };

  return (
    <Popup
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
        // setBackendError({ ...backendError, msg: "" });
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
        <div className="bg-white dark:bg-dark-popup w-fit rounded-md">
          <div className="flex flex-row-reverse justify-between pt-5 px-5">
            <IoIosCloseCircleOutline
              size={25}
              className="cursor-pointer hover:text-purple-500 hover:scale-110"
              onClick={close}
            />
            {(showExisting || showNew) && (
              <IoMdArrowBack
                size={20}
                className="cursor-pointer hover:text-purple-500 hover:scale-110"
                onClick={() => {
                  setShowNew(false);
                  setShowExisting(false);
                  setBackendError({ ...backendError, msg: "" });
                  setTitle("Existing User or new couple?");
                }}
              />
            )}
          </div>

          {/* {(backendError.msg || isLoading) && (
            <div className="px-5 pt-5">
              <Alert severity={backendError.type} variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {backendError.msg}
              </Alert>
            </div>
          )} */}

          <div className="px-10 pb-10 pt-5">
            <p className="m-10 mt-0 text-xl font-semibold">{title}</p>
            {!showExisting && !showNew && (
              <div className="buttons flex gap-12 w-full justify-center">
                <Button
                  className=""
                  onClick={() => {
                    setShowExisting(true);
                    setTitle("Find existing user profile");
                  }}
                >
                  Existing
                </Button>
                <Button
                  onClick={() => {
                    setShowNew(true);
                    setTitle("Register new eligible user");
                  }}
                >
                  New
                </Button>
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
                  //   value={formData.email || ""}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email || ""}
                  // className="rounded"
                ></TextField>

                <Button
                  //   disabled={isLoading}
                  className="px-10"
                  //   onClick={handleExistingSubmit}
                >
                  Submit
                </Button>
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
                  //   value={formData.firstName || ""}
                  onChange={handleInputChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName || ""}
                ></TextField>
                <TextField
                  label="Last Name"
                  required
                  variant="standard"
                  fullWidth
                  name="lastName"
                  //   value={formData.lastName || ""}
                  onChange={handleInputChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName || ""}
                ></TextField>
                <TextField
                  label="Email Address"
                  type="email"
                  required
                  variant="standard"
                  fullWidth
                  name="email"
                  //   value={formData.email || ""}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email || ""}
                ></TextField>

                <Button
                  //   disabled={isLoading}
                  className="px-10"
                  //   onClick={handleNewUserSubmit}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default parentPopup;
