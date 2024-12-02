import React, { useState, useEffect, useContext } from "react";
import { TextField, Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Button } from "@/components/ui/button";
import UserService from "@/service/userService";
import { userData } from "@/context/userAuth";

const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const { userDetails } = useContext(userData); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = userDetails?.userId; 
        if (email) {
          const profileData = await UserService.getUserIdByEmail(email);
          setFormData(profileData);
        } else {
          console.error("No email found in user details");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [userDetails]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted:", formData);
    // You can also send formData to an API here to update the profile
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
        Edit Profile
      </Typography>
      <Avatar
        src={formData.profilePicture}
        alt="Profile"
        sx={{ width: 100, height: 100, mb: 2 }}
      />
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
      <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          margin="normal"
          type="password"
          variant="outlined"
        />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            type="submit"
            variant="default"
            color="primary"
            sx={{ mt: 2, width: "100%", maxWidth: "500px" }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;