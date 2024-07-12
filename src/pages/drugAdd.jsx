import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { HiChevronLeft } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const drugAdd = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [bNumber, setbNumber] = useState("");
  const [bNumberError, setbNumberError] = useState(false);

  const [strength, setStrength] = useState("");
  const [strengthError, setStrengthError] = useState(false);

  const [mDate, setMDate] = useState("");
  const [mDateError, setMDateError] = useState(false);

  const [eDate, setEDate] = useState("");
  const [eDateError, setEDateError] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };
  const handlebNumberChange = (e) => {
    setbNumber(e.target.value);
    if (e.target.validity.valid) {
      setbNumberError(false);
    } else {
      setbNumberError(true);
    }
  };
  const handleStrengthChange = (e) => {
    setStrength(e.target.value);
    if (e.target.validity.valid) {
      setStrengthError(false);
    } else {
      setStrengthError(true);
    }
  };

  const handleMDateChange = (e) => {
    setMDate(e.target.value);
    if (e.target.validity.valid) {
      setMDateError(false);
    } else {
      setMDateError(true);
    }
  };

  const handleEDateChange = (e) => {
    setEDate(e.target.value);
    if (e.target.validity.valid) {
      setEDateError(false);
    } else {
      setEDateError(true);
    }
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.validity.valid) {
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
  };

  const { t } = useTranslation("drugAdd");

  return (
    <div>
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
              variant="standard"
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameError ? "Cannot be empty" : ""}
              // InputProps={{ sx: { backgroundColor: "white" } }}
            />
            <TextField
              required
              value={bNumber}
              onChange={handlebNumberChange}
              error={bNumberError}
              label={t("batch")}
              variant="standard"
              helperText={nameError ? "Cannot be empty" : ""}
              // InputProps={{ sx: { backgroundColor: "white" } }}
            />
            <TextField
              required
              value={strength}
              onChange={handleStrengthChange}
              error={strengthError}
              label={t("strength")}
              variant="standard"
              helperText={nameError ? "Cannot be empty" : ""}
              // InputProps={{ sx: { backgroundColor: "white" } }}
            />

            <TextField
              type="date"
              required
              value={mDate}
              onChange={handleMDateChange}
              error={mDateError}
              label={t("manufactured")}
              variant="standard"
              InputLabelProps={{ shrink: true }}
              helperText={mDateError ? "Cannot be empty" : ""}
              // InputProps={{ sx: { backgroundColor: "white" } }}
            />
            <TextField
              type="date"
              required
              value={eDate}
              onChange={handleEDateChange}
              error={eDateError}
              label={t("expired")}
              variant="standard"
              InputLabelProps={{ shrink: true }}
              helperText={mDateError ? "Cannot be empty" : ""}
              // InputProps={{ sx: { backgroundColor: "white" } }}
            />

            <TextField
              required
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              error={quantityError}
              label={t("quantity")}
              variant="standard"
              helperText={nameError ? "Cannot be empty" : ""}
              // InputProps={{ sx: { backgroundColor: "white" } }}
            />

            <Button className="w-1/2 self-center bg-[#620084] mt-5">
              {t("add")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default drugAdd;
