import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BoolTextInput from "@/components/userComponents/boolTextInput";
import BasicInfoInput from "@/components/userComponents/basicInfoInput";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import EligiblePagination from "@/components/userComponents/eligiblePagination";
import { conditions1, familyDisease, basicInfo } from "@/data/pregnancyData";
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import PageHeading from "@/components/ui/pageHeading";
import { useTranslation } from "react-i18next";

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
      // initialData[condition.name + "_man"] = "";
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });
    initialData.marriage = null;
    initialData.dob_woman = null;
    initialData.dob_man = null;
    console.log(initialData);

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

    localStorage.setItem("formObject", JSON.stringify(shallowFormObject));
    console.log(shallowFormObject);
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
    setFormObject((prevFormObject) => ({ ...prevFormObject, ...obj2, ...obj1 }));
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
          <h3 className="text-xl font-bold">Parent Details</h3>

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
            {/* <BasicInfoInput
              key={8}
              index={8}
              title={"Duration for the office"}
              value1={formObject.duration_woman || ""}
              value2={formObject.duration_man || ""}
              placeholder1={"Woman's duration"}
              placeholder2={"Man's duration"}
              onChange={
                (e) => {
                  formObject.duration_woman = e.target.value;
                }
              } 
            /> */}
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>9. Date of Birth</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Woman's Date of Birth"
                  className="w-96"
                  value={formObject.dob_woman ? dayjs(formObject.dob_woman) : null}
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
                  label="Man's Date of Birth"
                  className="w-96"
                  value={formObject.dob_man ? dayjs(formObject.dob_man) : null}
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
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>10. Marriage Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Marriage Date"
                  className="w-96 col-span-2"
                  value={formObject.marriage ? dayjs(formObject.marriage) : null}
                  onChange={(newValue) => {
                    const isoDate = newValue ? newValue.toISOString() : null;
                    setFormObject((prevFormObject) => ({
                      ...prevFormObject,
                      marriage: isoDate,
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>

          {/* Medical history */}
          <h3 className="text-xl font-bold mt-10">
            Pre-Existing Medical Conditions
          </h3>

          <div className="mt-4">
            {conditions1.map((condition, index) => (
              <BoolTextInput
                key={index}
                index={index}
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
          <h3 className="text-xl font-bold mt-10">
            Family History of Diseases/Other Health Conditions
          </h3>

          <div className="mt-4">
            {familyDisease.map((condition, index) => (
              <BoolTextInput
                key={index}
                index={index}
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

      <div className="container flex items-center mt-10 mb-5 gap-4">
        <Button type="button" variant="contained" color="primary" onClick={handleSave}>
          Next
        </Button>
        <EligiblePagination stage={1} />
      </div>
    </div>
  );
};

export default Pregnancy1;
