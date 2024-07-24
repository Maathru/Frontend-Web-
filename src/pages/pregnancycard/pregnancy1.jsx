import { useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BoolTextInput from "@/components/userComponents/boolTextInput";
import BasicInfoInput from "@/components/userComponents/basicInfoInput";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import EligiblePagination from "@/components/userComponents/eligiblePagination";
import { conditions1 , familyDisease } from "@/data/pregnancyData";
import { basicInfo } from "@/data/pregnancyData"
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import PageHeading from "@/components/ui/pageHeading";
import { useTranslation } from "react-i18next";
import { duration } from "@mui/material";

const Pregnancy1 = () => {
  const [formObject, setFormObject] = useState({ stage: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEligibleInfo = async () => {
      try {
        const response = await EligibleService.getEligibleInfo();
        const existing = EligibleService.mapDtoToFormObject(response);
        localStorage.setItem("formObject", JSON.stringify(existing));
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchEligibleInfo();
  }, []);

  const initiateFields = () => {
    const initialData = {};

    basicInfo.forEach((info) => {
      initialData[info.name + "_man"] = "";
      initialData[info.name + "_woman"] = "";
    });
    conditions1.forEach((condition) => {
      initialData[condition.name + "_man"] = "";
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });
    initialData.marriage = null;
    console.log(initialData);

    return initialData;
  };


  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = () => {
    formObject.stage = Math.max(formObject.stage, 2);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    navigate("/pregnancy/2");
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const obj2 = initiateFields();
    const obj1 = getFromLocalStorage();
    setFormObject({ ...formObject, ...obj2, ...obj1 });
  }, []);

  const { t } = useTranslation("pregnancy1");
  const title = t("title");

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
      <PageHeading title={title} />

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
          <h3 className="text-xl font-bold">Parents' Details</h3>

          <div className="grid grid-cols-3 gap-4 items-center mx-14">
            <p></p>
            <p className="text-center">Woman</p>
            <p className="text-center">Man</p>
          </div>

          {/* Input box */}

          <div>
            {basicInfo.map((detail, index) => (
              <BasicInfoInput
                key={index}
                index={index}
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
            <BasicInfoInput
                key={8}
                index={8}
                title={"Duration for the office"}
                value={formObject[duration] || ""}
                placeholder={""}
                onChange={(filed, e) => {
                  setData(filed, duration, e.target.value);
                }}
              />
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>9. Date of Birth</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of birth"
                  className="w-96"
                  value={dayjs(formObject.dob_woman || null)}
                  onChange={(e) => {
                    formObject.dob_woman = e;
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of birth"
                  className="w-96"
                  value={dayjs(formObject.dob_man || null)}
                  onChange={(e) => {
                    formObject.dob_woman = e;
                  }}
                />
              </LocalizationProvider>
              <p></p>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>10. Date of marriage</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of marriage"
                  className="w-96"
                  value={dayjs(formObject.marriage || null)}
                  onChange={(e) => {
                    formObject.marriage = e;
                  }}
                />
              </LocalizationProvider>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      {/* Diseases */}
      <div className="mt-24">
        <div className="m-12">
          {conditions1.map((condition, index) => (
            <BoolTextInput
              key={index}
              index={index}
              title={condition.title}
              placeholder={condition.placeholder}
              value1={formObject[condition.name] || false}
              value3={formObject[condition.name + "_other"] || ""}
              onChange={(filed, e) => {
                setData(filed, condition.name, e);
              }}
            />
          ))}
        </div>
      </div>

      <h3 className="text-xl mt-12">
        <span className="font-bold">Family Medical History</span>
      </h3>

      <div className="mt-12">
        <div className="m-12">
          {familyDisease.map((condition, index) => (
            <BoolTextInput
              key={index}
              index={index}
              title={condition.title}
              placeholder={condition.placeholder}
              value1={formObject[condition.name] || false}
              value3={formObject[condition.name + "_other"] || ""}
              onChange={(filed, e) => {
                setData(filed, condition.name, e);
              }}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave}>Save and Next</Button>

      <div className="flex w-full mt-24">
        <EligiblePagination total={4} current={1} />
      </div>
    </div>
  );
};

export default Pregnancy1;
