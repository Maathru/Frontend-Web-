import Popup from "reactjs-popup";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { errorType, Toast } from "./toast";
import DrugService from "@/service/drugService";
import { useTitle } from "@/hooks/useTitle";

const DrugAddPopup = ({
  addButton,
  brandLabel,
  batchLabel,
  strengthLabel,
  quantityLabel,
  compositionLabel,
  doseLabel,
  manufactureLabel,
  expiryLabel,
  submitButton,
  isOpen,
  setIsOpen,
}) => {
  useTitle("Add Drug");

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
  //   const [isOpen, setIsOpen] = useState(false);

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
          <div className="px-10 flex flex-col gap-6 pb-6">
            <TextField
              required
              label={brandLabel}
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              error={errors.brandName ? true : false}
              helperText={errors.brandName ? errors.brandName : ""}
              variant="standard"
            />

            <TextField
              required
              label={batchLabel}
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleInputChange}
              error={errors.batchNumber ? true : false}
              helperText={errors.batchNumber ? errors.batchNumber : ""}
              variant="standard"
            />

            <TextField
              required
              label={strengthLabel}
              name="strength"
              value={formData.strength}
              onChange={handleInputChange}
              error={errors.strength ? true : false}
              helperText={errors.strength ? errors.strength : ""}
              variant="standard"
            />

            <TextField
              required
              label={quantityLabel}
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              error={errors.quantity ? true : false}
              helperText={errors.quantity ? errors.quantity : ""}
              variant="standard"
            />
            <TextField
              required
              label={compositionLabel}
              name="composition"
              value={formData.composition}
              onChange={handleInputChange}
              error={errors.composition ? true : false}
              helperText={errors.composition ? errors.composition : ""}
              variant="standard"
            />

            <TextField
              label={doseLabel}
              name="recommendedDose"
              value={formData.recommendedDose}
              onChange={handleInputChange}
              variant="standard"
            />

            <TextField
              required
              label={manufactureLabel}
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
              label={expiryLabel}
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
              {submitButton}
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DrugAddPopup;
