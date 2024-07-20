import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { HiChevronLeft } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DrugService from "@/service/drugService";
import { errorType, Toast } from "@/components/toast";

const DrugAdd = () => {
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
  const navigate = useNavigate();
  const { t } = useTranslation("drugAdd");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "brandName":
        if (!value) return "Brand name is required";
        break;
      case "batchNumber":
        if (!value) return "Batch number is required";
        break;
      case "strength":
        if (!value) return "Strength is required";
        break;
      case "manufacturedDate":
        if (!value) return "Manufactured date is required";
        const manufacturedDate = new Date(value);
        if (manufacturedDate >= new Date())
          return "Manufactured date must be in the past";
        break;
      case "expiryDate":
        if (!value) return "Expiry date is required";
        const expiryDate = new Date(value);
        if (expiryDate <= new Date())
          return "Expiry date must be in the future";
        break;
      case "quantity":
        if (!value || value == 0) return "Quantity cannot be empty";
        if (value < 0) return "Quantity cannot be less than 0";
        break;
      case "composition":
        if (!value) return "Composition is required";
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
      const response = await DrugService.addDrug(formData);

      setFormData({
        brandName: "",
        recommendedDose: "",
        batchNumber: "",
        strength: "",
        manufacturedDate: "",
        expiryDate: "",
        quantity: "",
        composition: "",
      });
      Toast(response, errorType.SUCCESS);
      navigate("/drugs");
    } catch (error) {
      console.log(error.message);
      Toast(error.message, errorType.ERROR);

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
          Toast(data, errorType.ERROR);
        }
      }
    }
  };

  return (
    <div className="content-container">
      <div>
        <div className="text-3xl text-[#5B5B5B] font-semibold ">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>

        <div className="flex justify-center">
          <div className=" w-8/12 py-12 px-36 flex flex-col gap-6 ">
            <TextField
              required
              label={t("brand")}
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              error={errors.brandName ? true : false}
              helperText={errors.brandName ? errors.brandName : ""}
              variant="standard"
            />

            <TextField
              required
              label={t("batch")}
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleInputChange}
              error={errors.batchNumber ? true : false}
              helperText={errors.batchNumber ? errors.batchNumber : ""}
              variant="standard"
            />

            <TextField
              required
              label={t("strength")}
              name="strength"
              value={formData.strength}
              onChange={handleInputChange}
              error={errors.strength ? true : false}
              helperText={errors.strength ? errors.strength : ""}
              variant="standard"
            />

            <TextField
              required
              type="number"
              label={t("quantity")}
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              error={errors.quantity ? true : false}
              helperText={errors.quantity ? errors.quantity : ""}
              variant="standard"
            />
            <TextField
              required
              label={t("composition")}
              name="composition"
              value={formData.composition}
              onChange={handleInputChange}
              error={errors.composition ? true : false}
              helperText={errors.composition ? errors.composition : ""}
              variant="standard"
            />

            <TextField
              label={t("dose")}
              name="recommendedDose"
              value={formData.recommendedDose}
              onChange={handleInputChange}
              variant="standard"
            />

            <TextField
              required
              type="date"
              name="manufacturedDate"
              value={formData.manufacturedDate}
              onChange={handleInputChange}
              error={errors.manufacturedDate ? true : false}
              helperText={
                errors.manufacturedDate ? errors.manufacturedDate : ""
              }
              variant="standard"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              required
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              error={errors.expiryDate ? true : false}
              helperText={errors.expiryDate ? errors.expiryDate : ""}
              variant="standard"
              InputLabelProps={{ shrink: true }}
            />

            <Button
              className="w-1/2 self-center bg-[#620084] mt-5"
              onClick={handleSubmit}
            >
              {t("add")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugAdd;
