import React, { useEffect, useState } from "react";
import { TextField, Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Button } from "@/components/ui/button";
import UserService from "@/service/userService";
import { errorType, Toast } from "@/components/toast";
import { format } from "date-fns";
import { role } from "@/data/roleData";

const Input = styled("input")({
  display: "none",
});

const Capitalize = (str) => {
  if (!str) return str;

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const FormattedDateTime = (params) => {
  if (!params) return "";

  const date = new Date(params);

  const readableDate = format(date, "MMMM do, yyyy"); // "July 26th, 2024"
  const readableTime = format(date, "hh:mm:ss a"); // "06:39:04 PM"

  return `${readableTime} at ${readableDate}`;
};

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await UserService.updateProfile(formData);
      Toast(response, errorType.SUCCESS);
      setIsUpdated(true);
      setEditMode(false);
    } catch (error) {
      const data = error.response?.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.forEach((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });
          setErrors(newErrors);
        } else {
          Toast(data || "Failed to update profile", errorType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUser();
        setFormData(response);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchUser();
  }, [isUpdated]);

  const validateField = (name, value) => {
    if (
      formData.role == role.ADMIN ||
      formData.role == role.DOCTOR ||
      formData.role == role.MIDWIFE
    ) {
      switch (name) {
        case "firstName":
          if (!value) return "First name is required";
          break;
        case "lastName":
          if (!value) return "Last name is required";
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
        case "designation":
          if (!value) return "Designation is required";
          break;
        default:
          break;
      }
      return "";
    } else {
      switch (name) {
        case "firstName":
          if (!value) return "First name is required";
          break;
        case "lastName":
          if (!value) return "Last name is required";
          break;
        default:
          break;
      }
      return "";
    }
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
        mb: 3,
        p: 2,
        maxWidth: 800,
        mx: "auto",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        {editMode ? "Edit Profile" : "View Profile"}
      </Typography>
      <Avatar
        src={formData.profilePicture}
        alt="Profile"
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      {editMode && (
        <label htmlFor="profile-picture">
          <Input
            accept="image/*"
            id="profile-picture"
            type="file"
            onChange={handleProfilePictureChange}
          />
          <Button variant="outline" component="span">
            {formData.profilePicture ? "Change Picture" : "Upload Picture"}
          </Button>
        </label>
      )}
      {!editMode && (
        <Button variant="hollow" onClick={() => setEditMode(true)}>
          Edit
        </Button>
      )}

      <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
        <TextField
          disabled={!editMode}
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          disabled={!editMode}
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />

        {!editMode && (
          <TextField
            disabled
            fullWidth
            label="Email"
            value={formData.email || ""}
            margin="normal"
            type="email"
            variant="outlined"
          />
        )}

        {(formData.role == role.ADMIN ||
          formData.role == role.DOCTOR ||
          formData.role == role.MIDWIFE) && (
          <>
            <TextField
              disabled={!editMode}
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled={!editMode}
              fullWidth
              label="NIC"
              name="nic"
              value={formData.nic || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            {!editMode && (
              <>
                <TextField
                  disabled
                  fullWidth
                  label="Gender"
                  value={Capitalize(formData.gender) || ""}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  disabled
                  fullWidth
                  label="Date of Birth"
                  value={formData.dob || ""}
                  margin="normal"
                  variant="outlined"
                />
              </>
            )}

            <TextField
              disabled={!editMode}
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1 || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled={!editMode}
              fullWidth
              label="Street"
              name="street"
              value={formData.street || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled={!editMode}
              fullWidth
              label="City"
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled={!editMode}
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled={!editMode}
              fullWidth
              label="Qualifications"
              name="qualifications"
              value={formData.qualifications || ""}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            {!editMode && (
              <>
                <TextField
                  disabled
                  fullWidth
                  label="MOH"
                  value={Capitalize(formData.moh) || ""}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  disabled
                  fullWidth
                  label="Region"
                  value={Capitalize(formData.region) || ""}
                  margin="normal"
                  variant="outlined"
                />
              </>
            )}
          </>
        )}

        {!editMode && (
          <>
            <TextField
              disabled
              fullWidth
              label="Role"
              value={Capitalize(formData.role) || ""}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled
              fullWidth
              label="Last login"
              value={FormattedDateTime(formData.lastLogin) || ""}
              margin="normal"
              variant="outlined"
            />
          </>
        )}

        {editMode && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              disabled={!editMode}
              type="submit"
              variant="default"
              color="primary"
              sx={{ mt: 2, width: "100%", maxWidth: "500px" }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default Profile;
