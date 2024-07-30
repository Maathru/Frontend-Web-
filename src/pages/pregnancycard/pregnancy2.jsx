import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoolTextInput from "@/components/userComponents/boolTextInput";
import DoubleInput from "@/components/userComponents/doubleInput";
import BasicInfoInput from "@/components/userComponents/basicInfoInput";
import DateInput from "@/components/userComponents/dateInput";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/userComponents/customPagination";
import {
  presentObstetricDates,
  currentPregnancyStatus,
  otherSituations,
} from "@/data/pregnancyData";
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import Heading from "@/components/ui/heading";
import { useTranslation } from "react-i18next";
import SingleInput from "@/components/userComponents/singleInput";

const Pregnancy2 = () => {
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
    const initialData = {
      no_of_pregnancies_g: "",
      no_of_pregnancies_p: "",
      no_of_living_children: "",
      youngest_child_dob: "",
    };

    presentObstetricDates.forEach((input) => {
      initialData[input.name] = "";
    });
    currentPregnancyStatus.forEach((input) => {
      initialData[input.name] = "";
      initialData[input.name + "_other"] = "";
    });
    otherSituations.forEach((input) => {
      initialData[input.name] = "";
      initialData[input.name + "_other"] = "";
    });
    initialData.marriage = null;

    return initialData;
  };

  const setData = (field, name, value) => {
    console.log(field, name, value);
    const newObject = {};
    newObject[name + (field ? `_${field}` : "")] = value || "";
    setFormObject((prev) => ({ ...prev, ...newObject }));
  };

  const handleSave = () => {
    formObject.stage = Math.max(formObject.stage, 2);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    navigate("/pregnancy/3");
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
    setFormObject((prev) => ({ ...prev, ...obj2, ...obj1 }));
  }, []);

  const { t } = useTranslation("pregnancy1");
  const title = t("title");

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
        <Heading title={title} />

        <p className="text-xl font-bold mt-8">
          Mother&apos;s Name : A.P. Gamage
        </p>
      </div>

      {/* Form section */}
      <div className="mt-20">
        {/* Form container */}
        <div className="mt-10">
          <h3 className="text-xl font-bold">Present Obstetric History</h3>
          {/* Input box */}
          <div>
            <DoubleInput
              key={0}
              index={0}
              title="How Many Pregnancies for now?"
              value1={formObject["no_of_pregnancies_g"] || ""}
              value2={formObject["no_of_pregnancies_p"] || ""}
              placeholder1="P"
              placeholder2="G"
              onChange={(field, value) => {
                setFormObject((prevState) => ({
                  ...prevState,
                  [field]: value,
                }));
              }}
            />

            <SingleInput
              title="How many living children do you have?"
              index={1}
              placeholder="No of Living Children"
              value={formObject["no_of_living_children"] || ""}
              onChange={(field, value) => {
                setData(field, "no_of_living_children", value);
              }}
            />

            {presentObstetricDates.map((input, index) => (
              <DateInput
                key={index}
                title={input.title}
                index={index + 2}
                placeholder={input.placeholder}
                value={formObject[input.name] || ""}
                onChange={(field, value) => {
                  setData(field, input.name, value);
                }}
              />
            ))}

            <SingleInput
              title="Number of gestational weeks at enrollment"
              index={8}
              placeholder="Gestational Weeks"
              value={formObject["gestational_weeks"] || ""}
              onChange={(field, value) => {
                setData(field, "gestational_weeks", value);
              }}
            />
          </div>

          <h3 className="text-xl font-bold mt-10">Current Pregnancy</h3>
          <div className="grid grid-cols-2 gap-4">
            {currentPregnancyStatus.map((input, index) => (
              <BoolTextInput
                key={index}
                index={index}
                title={input.title}
                placeholder={input.placeholder}
                value1={formObject[input.name + "_woman"] || ""}
                value2={formObject[input.name + "_other"] || ""}
                onChange={(field, value) => {
                  setData(field, input.name, value);
                }}
              />
            ))}
          </div>

          <h3 className="text-xl font-bold mt-10">Other Situations</h3>
          <div className="grid grid-cols-2 gap-4">
            {otherSituations.map((input, index) => (
              <BoolTextInput
                key={index}
                index={index}
                title={input.title}
                placeholder={input.placeholder}
                value1={formObject[input.name + "_woman"] || ""}
                value2={formObject[input.name + "_other"] || ""}
                onChange={(field, value) => {
                  setData(field, input.name, value);
                }}
              />
            ))}
          </div>
        </div>

        {/* Save & Continue button */}
        <div className="flex justify-end gap-5">
          <Button onClick={handleSave}>Save & Continue</Button>
        </div>
      </div>
      <CustomPagination path={"/eligible/"} stage={2} />
    </div>
  );
};

export default Pregnancy2;
