import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BoolTextInput from "@/components/userComponents/boolTextInput";
import BasicInfoInput from "@/components/userComponents/basicInfoInput";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import CustomPagination from "@/components/userComponents/customPagination";
import { conditions1, familyDisease, basicInfo } from "@/data/pregnancyData";
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import Heading from "@/components/ui/heading";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { useTitle } from "@/hooks/useTitle";
import LocationAddPopup from "@/components/map/LocationAddPopup";

const Pregnancy1 = () => {
  useTitle("Pregnancy Card - Page 1");
  const [formObject, setFormObject] = useState({ stage: 1 });
  const location = useLocation();
  const navigate = useNavigate();

  const editMode =
    location.pathname.split("/")[2] === "add" ||
    location.pathname.split("/")[2] === "edit";

  useEffect(() => {
    const fetchEligibleInfo = async () => {
      try {
        const response = await EligibleService.getEligibleInfo();
        const existing = EligibleService.mapDtoToFormObject(response);
        localStorage.setItem("pregnancy", JSON.stringify(existing));
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    // fetchEligibleInfo();
  }, []);

  const initiateFields = () => {
    const initialData = {};

    initialData.name_woman = "";
    initialData.name_man = "";
    initialData.address = "";
    initialData.location = "";
    initialData.phone_woman = "";
    initialData.phone_man = "";
    initialData.dob_woman = "";
    initialData.dob_man = "";

    basicInfo.forEach((info) => {
      initialData[info.name + "_man"] = "";
      initialData[info.name + "_woman"] = "";
    });

    initialData.duration = "";

    conditions1.forEach((condition) => {
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });

    familyDisease.forEach((disease) => {
      initialData[disease.name + "_woman"] = "";
      initialData[disease.name + "_other"] = "";
    });

    return initialData;
  };

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject((prevFormObject) => ({ ...prevFormObject, ...newObject }));
  };

  const handleSave = () => {
    formObject.stage = Math.max(formObject.stage, 2);

    // Create a shallow copy of formObject to avoid any circular references
    const shallowFormObject = { ...formObject };

    localStorage.setItem("pregnancy", JSON.stringify(shallowFormObject));
    navigate("/pregnancy/2");
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("pregnancy");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const obj1 = initiateFields();
    const obj2 = getFromLocalStorage();
    setFormObject((prevFormObject) => ({
      ...prevFormObject,
      ...obj1,
      ...obj2,
    }));
  }, []);

  const { t } = useTranslation("pregnancy1");

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
        <Heading title={t("title")} />

        <p className="text-xl font-bold mt-8">
          Mother&apos;s Name : A.P. Gamage
        </p>
        <div className="grid grid-cols-2">
          <div className="bg-box-purple rounded-xl sm:m-8 relative shadow-md">
            <div className="mt-5 text-sm md:text-base p-4">
              <div className="flex my-4 gap-2">
                <p>Registration Number:</p>
                <p>1</p>
              </div>
              <div className="flex my-4 gap-2">
                <p>Registered Address:</p>
                <p>Udahamulla</p>
              </div>
              <div className="flex my-4 gap-2">
                <p>Eligible Couple ID:</p>
                <p>1</p>
              </div>
              <div className="flex my-4 gap-2">
                <p>DN Division:</p>
                <p>2024/Nu/32</p>
              </div>
              <div className="flex my-4 gap-2">
                <p>MOH Division:</p>
                <p>Udahamulla</p>
              </div>
              <div className="flex my-4 gap-2">
                <p>Family Health Service unit:</p>
                <p>Udahamulla</p>
              </div>
            </div>
          </div>

          <div className="bg-box-purple rounded-xl sm:m-8 relative shadow-md">
            <div className="mt-5 text-sm md:text-base p-4">
              <div className="flex my-4 gap-2 font-semibold">
                Any Identified Obstetric Risk Conditions/Medical Conditions:
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="mt-20">
        {/* Form container */}
        <div className="mt-10">
          <h3 className="text-xl font-bold">Parent Details</h3>

          <div className="grid grid-cols-3 gap-4 items-center mx-14">
            <p></p>
            <p className="text-center">Wife</p>
            <p className="text-center">Husband</p>
          </div>

          {/* Input box */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>1. Name</p>
              <TextField
                value={formObject.name_woman || ""}
                label="Enter woman's name"
                variant="outlined"
                className="w-96"
                onChange={(e) => setData("woman", "name", e.target.value)}
              />
              <TextField
                value={formObject.name_man || ""}
                label="Enter man's name"
                variant="outlined"
                className="w-96"
                onChange={(e) => setData("man", "name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14 pr-3">
              <p>2. Address</p>
              <TextField
                value={formObject.address || ""}
                label="Enter Address"
                variant="outlined"
                className="col-start-2 col-end-4"
                disabled
                aria-readonly
              />
            </div>

            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14 pr-3">
              <LocationAddPopup
                setFormObject={setFormObject}
                formObject={formObject}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>3. Telephone Number</p>
              <TextField
                value={formObject.phone_woman || ""}
                label="Enter woman's telephone number"
                variant="outlined"
                className="w-96"
                onChange={(e) => setData("woman", "phone", e.target.value)}
              />
              <TextField
                value={formObject.phone_man || ""}
                label="Enter man's telephone number"
                variant="outlined"
                className="w-96"
                onChange={(e) => setData("man", "phone", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>4. Date of Birth</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Wife's Date of Birth"
                  className="w-96"
                  value={dayjs(formObject.dob_woman) || null}
                  onChange={(newValue) => {
                    const isoDate = newValue ? newValue.toISOString() : null;
                    setFormObject((prevFormObject) => ({
                      ...prevFormObject,
                      dob_woman: isoDate,
                    }));
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Husband's Date of Birth"
                  className="w-96"
                  value={dayjs(formObject.dob_man) || null}
                  onChange={(newValue) => {
                    const isoDate = newValue ? newValue.toISOString() : null;
                    setFormObject((prevFormObject) => ({
                      ...prevFormObject,
                      dob_man: isoDate,
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>

            {basicInfo.map((detail, index) => (
              <BasicInfoInput
                key={index}
                index={index + 4}
                type={detail.type && detail.type}
                title={detail.title}
                value1={formObject[detail.name + "_woman"] || ""}
                value2={formObject[detail.name + "_man"] || ""}
                placeholder1={detail.placeholder1}
                placeholder2={detail.placeholder2}
                onChange={(filed, e) => {
                  setData(filed, detail.name, e.target.value);
                }}
              />
            ))}

            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>8. Distance for the office </p>
              <TextField
                value={formObject.duration || ""}
                label="Enter distance"
                variant="outlined"
                className="w-96"
                onChange={(e) =>
                  setFormObject({ ...formObject, duration: e.target.value })
                }
              />
            </div>
          </div>

          {/* Medical history */}
          <h3 className="text-xl font-bold mt-10">
            Pre-Existing Medical Conditions
          </h3>

          <div className="grid grid-cols-3 gap-4 items-center mt-5 mb-6">
            <div className="w-fit"></div>
            <div>Wife</div>
          </div>

          <div className="mt-4">
            {conditions1.map((condition, index) => (
              <BoolTextInput
                key={index}
                title={condition.title}
                value1={formObject[condition.name + "_woman"] || ""}
                value2={formObject[condition.name + "_other"] || ""}
                placeholder={condition.placeholder}
                onChange={(field, value) => {
                  setData(field, condition.name, value);
                }}
              />
            ))}
          </div>

          {/* Family health conditions */}
          <h3 className="text-xl font-bold mt-16">
            Family History of Diseases/Other Health Conditions
          </h3>

          <div className="grid grid-cols-3 gap-4 items-center mt-10 mb-6">
            <div className="w-fit"></div>
            <div>Wife</div>
          </div>

          <div className="mt-4">
            {familyDisease.map((condition, index) => (
              <BoolTextInput
                key={index}
                title={condition.title}
                value1={formObject[condition.name + "_woman"] || ""}
                value2={formObject[condition.name + "_other"] || ""}
                placeholder={condition.placeholder}
                onChange={(field, value) => {
                  setData(field, condition.name, value);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleSave}>Save and Next</Button>

      <div className="flex w-full mt-24">
        <CustomPagination path={"/pregnancy/"} total={4} current={1} />
      </div>
    </div>
  );
};

export default Pregnancy1;
