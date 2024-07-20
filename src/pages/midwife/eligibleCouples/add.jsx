import { Button } from "@/components/ui/button";
import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiPlus } from "react-icons/hi";
import PageHeading from "@/components/ui/pageHeading";

const addCouples = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    recommendedDose: "",
    batchNumber: "",
    strength: "",
    manufacturedDate: "",
    expiryDate: "",
    quantity: "",
    composition: "",
  });
  const [errors, setErrors] = useState({});

  const { t } = useTranslation("eligibleCouplesAdd");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "womanName":
        if (!value) return "Woman's name is required";
        break;
      case "manName":
        if (!value) return "Man's name is required";
        break;
      case "address":
        if (!value) return "Address is required";
        break;
      case "womanPhone":
        if (!value) return "Woman's telephone is required";
        break;
      case "manPhone":
        if (!value) return "Man's telephone is required";
        break;
      case "womanDob":
        if (!value) return "Woman's date of birth is required";
        const womanDob = new Date(value);
        if (womanDob >= new Date())
          return "Woman's date of birth must be in the past";
        break;
      case "manDob":
        if (!value) return "Man's date of birth is required";
        const manDob = new Date(value);
        if (manDob >= new Date())
          return "Man's date of birth must be in the past";
        break;
      case "womanAgeMarried":
        if (!value) return "Woman's married age cannot be empty";
        break;
      case "manAgeMarried":
        if (!value) return "Man's married age cannot be empty";
        break;
      case "womanEducation":
        if (!value) return "Woman's education cannot be empty";
        break;
      case "manEducation":
        if (!value) return "Man's education cannot be empty";
        break;
      case "womanOccupation":
        if (!value) return "Woman's occupation cannot be empty";
        break;
      case "manOccupation":
        if (!value) return "Man's occupation cannot be empty";
        break;
      case "childred":
        if (!value) return "Number of childred is required";
        break;
      case "womanWeight":
        if (!value || value == 0) return "Woman's weight cannot be empty";
        if (value < 0) return "Woman's weight cannot be less than 0";
        break;
      case "manWeight":
        if (!value || value == 0) return "Man's weight cannot be empty";
        if (value < 0) return "Man's weight cannot be less than 0";
        break;
      case "womanHeight":
        if (!value || value == 0) return "Woman's height cannot be empty";
        if (value < 0) return "Woman's height cannot be less than 0";
        break;
      case "manHeight":
        if (!value || value == 0) return "Man's height cannot be empty";
        if (value < 0) return "Man's height cannot be less than 0";
        break;
      case "womanBmi":
        if (!value || value == 0) return "Woman's BMI cannot be empty";
        if (value < 0) return "Woman's BMI cannot be less than 0";
        break;
      case "manBmi":
        if (!value || value == 0) return "Man's BMI cannot be empty";
        if (value < 0) return "Man's BMI cannot be less than 0";
        break;
      case "womanBloodType":
        if (!value) return "Woman's Blood Type cannot be empty";
        break;
      case "manBloodType":
        if (!value) return "Man's Blood Type cannot be empty";
        break;
      case "womanHemoglobin":
        if (!value || value == 0)
          return "Woman's hemoglobin level cannot be empty";
        if (value < 0) return "Woman's hemoglobin level cannot be less than 0";
        break;
      case "manHemoglobin":
        if (!value || value == 0)
          return "Man's hemoglobin level cannot be empty";
        if (value < 0) return "Man's hemoglobin level cannot be less than 0";
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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const validationErrors = validate();

  //     if (Object.keys(validationErrors).length !== 0) {
  //         setErrors(validationErrors);
  //         return;
  //       }
  //   }

  const title = t("title");

  return (
    <div className="content-container">
      <PageHeading title={title} />
              
      {/* main details layer */}
      <div>
        <Typography variant="h5">{t("subtitle1")}</Typography>
        <div className="">
          <Typography variant="h6">{t("subtitle1.1")}</Typography>
          <div className="grid eligible-form grid-rows-9 gap-x-20 gap-y-5">
            <Typography className="col-start-2 text-center">Woman</Typography>
            <Typography className="text-center">Man</Typography>

            <Typography variant="body1">1. Name</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              //   value={formData.womanName}
              name="womanName"
              onChange={handleInputChange}
              error={errors.womanName ? true : false}
              helperText={errors.womanName ? errors.womanName : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.manName}
              name="manName"
              onChange={handleInputChange}
              error={errors.manName ? true : false}
              helperText={errors.manName ? errors.manName : ""}
            ></TextField>

            <Typography variant="body1">2. Address</Typography>
            <TextField
              required
              className="rounded col-span-2"
              size="small"
              value={formData.address}
              name="address"
              onChange={handleInputChange}
              error={errors.address ? true : false}
              helperText={errors.address ? errors.address : ""}
            ></TextField>

            <Typography variant="body1">3. Telephone Number</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanPhone}
              name="womanPhone"
              onChange={handleInputChange}
              error={errors.womanPhone ? true : false}
              helperText={errors.womanPhone ? errors.womanPhone : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.manPhone}
              name="manPhone"
              onChange={handleInputChange}
              error={errors.manPhone ? true : false}
              helperText={errors.manPhone ? errors.manPhone : ""}
            ></TextField>

            <Typography variant="body1">4. Date of Birth</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="date"
              value={formData.womanDob}
              name="womanDob"
              onChange={handleInputChange}
              error={errors.womanDob ? true : false}
              helperText={errors.womanDob ? errors.womanDob : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              type="date"
              value={formData.manDob}
              name="manDob"
              onChange={handleInputChange}
              error={errors.manDob ? true : false}
              helperText={errors.manDob ? errors.manDob : ""}
            ></TextField>

            <Typography variant="body1">5. Age married</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanAgeMarried}
              name="womanAgeMarried"
              onChange={handleInputChange}
              error={errors.womanAgeMarried ? true : false}
              helperText={errors.womanAgeMarried ? errors.womanAgeMarried : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.manAgeMarried}
              name="manAgeMarried"
              onChange={handleInputChange}
              error={errors.manAgeMarried ? true : false}
              helperText={errors.manAgeMarried ? errors.manAgeMarried : ""}
            ></TextField>

            <Typography variant="body1">6. Highest Education Level </Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanEducation}
              name="womanEducation"
              onChange={handleInputChange}
              error={errors.womanEducation ? true : false}
              helperText={errors.womanEducation ? errors.womanEducation : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.manEducation}
              name="manEducation"
              onChange={handleInputChange}
              error={errors.manEducation ? true : false}
              helperText={errors.manEducation ? errors.manEducation : ""}
            ></TextField>

            <Typography variant="body1">7. Occupation</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanOccupation}
              name="womanOccupation"
              onChange={handleInputChange}
              error={errors.womanOccupation ? true : false}
              helperText={errors.womanOccupation ? errors.womanOccupation : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.manOccupation}
              name="manOccupation"
              onChange={handleInputChange}
              error={errors.manOccupation ? true : false}
              helperText={errors.manOccupation ? errors.manOccupation : ""}
            ></TextField>

            <Typography variant="body1">
              8. Number of children alive (Ages)
            </Typography>
            <TextField
              required
              className="rounded col-span-2"
              size="small"
              value={formData.childred}
              name="childred"
              onChange={handleInputChange}
              error={errors.childred ? true : false}
              helperText={errors.childred ? errors.childred : ""}
            ></TextField>
          </div>
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.2")}</Typography>
          <div className="flex items-center gap-2 text-primary-purple">
            <HiPlus className="inline" />
            <Typography>Add more</Typography>
          </div>
          <div className="flex gap-8 justify-center items-center">
            <Typography>
              Pergnancy <span>1</span>
            </Typography>
            <TextField
              className="rounded"
              size="small"
              label="Gender"
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              label="Result"
            ></TextField>
          </div>
        </div>
        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.3")}</Typography>
          <div className="flex items-center gap-2 text-primary-purple">
            <HiPlus className="inline" />
            <Typography>Add more</Typography>
          </div>
          <div className="flex gap-8 justify-center items-center">
            <TextField
              className="rounded"
              size="small"
              label="Method"
              sx={{
                width: "20%",
              }}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              label="Accepted Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{
                width: "20%",
              }}
            ></TextField>
          </div>
        </div>
      </div>

      {/* more details layer */}
      <div>
        <Typography variant="h5">{t("subtitle2")}</Typography>
        <div>
          <Typography variant="h6">{t("subtitle2.1")}</Typography>
          <div className="grid eligible-form grid-rows-5 gap-x-20 gap-y-5">
            <Typography className="col-start-2 text-center">Woman</Typography>
            <Typography className="text-center">Man</Typography>

            <Typography variant="body1">1. Weight (kg)</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanWeight}
              name="womanWeight"
              onChange={handleInputChange}
              error={errors.womanWeight ? true : false}
              helperText={errors.womanWeight ? errors.womanWeight : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.manWeight}
              name="manWeight"
              onChange={handleInputChange}
              error={errors.manWeight ? true : false}
              helperText={errors.manWeight ? errors.manWeight : ""}
            ></TextField>

            <Typography variant="body1">2. Height (m)</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanHeight}
              name="womanHeight"
              onChange={handleInputChange}
              error={errors.womanHeight ? true : false}
              helperText={errors.womanHeight ? errors.womanHeight : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.manHeight}
              name="manHeight"
              onChange={handleInputChange}
              error={errors.manHeight ? true : false}
              helperText={errors.manHeight ? errors.manHeight : ""}
            ></TextField>

            <Typography variant="body1">3. BMI</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanBmi}
              name="womanBmi"
              onChange={handleInputChange}
              error={errors.womanBmi ? true : false}
              helperText={errors.womanBmi ? errors.womanBmi : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.manBmi}
              name="manBmi"
              onChange={handleInputChange}
              error={errors.manBmi ? true : false}
              helperText={errors.manBmi ? errors.manBmi : ""}
            ></TextField>

            <Typography variant="body1">4. Blood Type</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanBloodType}
              name="womanBloodType"
              onChange={handleInputChange}
              error={errors.womanBloodType ? true : false}
              helperText={errors.womanBloodType ? errors.womanBloodType : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.manBloodType}
              name="manBloodType"
              onChange={handleInputChange}
              error={errors.manBloodType ? true : false}
              helperText={errors.manBloodType ? errors.manBloodType : ""}
            ></TextField>

            <Typography variant="body1">5. Hemoglobin level</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanHemoglobin}
              name="womanHemoglobin"
              onChange={handleInputChange}
              error={errors.womanHemoglobin ? true : false}
              helperText={errors.womanHemoglobin ? errors.womanHemoglobin : ""}
            ></TextField>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.manHemoglobin}
              name="manHemoglobin"
              onChange={handleInputChange}
              error={errors.manHemoglobin ? true : false}
              helperText={errors.manHemoglobin ? errors.manHemoglobin : ""}
            ></TextField>
          </div>
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle2.2")}</Typography>
          <TextField className="rounded" sx={{ width: "100%" }}></TextField>
        </div>
        <div className="mt-24">
          <Typography variant="h6">{t("subtitle2.3")}</Typography>
          <TextField className="rounded" sx={{ width: "100%" }}></TextField>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <Button className="px-20 text-lg">{t("submit")}</Button>
      </div>
    </div>
  );
};

export default addCouples;
