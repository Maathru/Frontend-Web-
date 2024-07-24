import { useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import BoolTextInput from "@/components/userComponents/boolTextInput";
import BasicInfoInput from "@/components/userComponents/basicInfoInput";
import DateInput from "@/components/userComponents/dateInput";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import EligiblePagination from "@/components/userComponents/eligiblePagination";
import { presentObstetricDates , currentPregnancyStatus, otherSituations } from "@/data/pregnancyData";
import { conditions1 , basicInfo, familyDisease } from "@/data/pregnancyData"
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import PageHeading from "@/components/ui/pageHeading";
import { useTranslation } from "react-i18next";
import { duration } from "@mui/material";
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
    const initialData = {};

    initialData["no_of_pregnancies_g"] = "";
    initialData["no_of_pregnancies_p"] = "";
    initialData["no_of_living_children"] = "";
    initialData["youngest_child_dob"] = "";

    basicInfo.forEach((info) => {
      initialData[info.name + "_man"] = "";
      initialData[info.name + "_woman"] = "";
    });
    conditions1.forEach((condition) => {
      initialData[condition.name + "_man"] = "";
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });
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

      </div>

      {/* Form section */}
      <div className="mt-20">

        {/* Form container */}
        <div className="mt-10">
          <h3 className="text-xl font-bold">Present Obstetric History</h3>

          {/* Input box */}

          <div>
            <BasicInfoInput
                key={0}
                index={0}
                title="How Many Pregnancies for now?"
                value1={formObject["no_of_pregnancies_g"] || ""}
                value2={formObject["no_of_pregnancies_p"] || ""}
                placeholder1="P"
                placeholder2="G"
                onChange={(filed, e) => {
                    setData(filed, "no_of_pregnancies" , e.target.value);
                }}
            />

            
            <SingleInput 
                title="How many living children do you have?" 
                index={1} 
                placeholder="No of Living Children" 
                value={formObject["no_of_living_children"] || ""} 
                onChange={(filed, e) => {
                    setData(filed , "no_of_living_children" , e.target.value)
                }} 
            />
            
              {presentObstetricDates.map((input, index) => (
                <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14" key={index}>
                  <DateInput
                    title={input.title}
                    index={index}
                    placeholder={input.placeholder}
                    value={formObject[input.name] || ""}
                    onChange={(filed, e) => {
                      setData(filed, input.name, e);
                    }}
                  />
                </div>
              ))}

            <SingleInput 
                title="Number of gestational weeks at enrollment" 
                index={8} 
                placeholder="Gestational Weeks" 
                value={formObject["gestational_weeks"] || ""} 
                onChange={(filed, e) => {
                    setData(filed , "gestational_weeks" , e.target.value)
                }} 
            />

            <SingleInput 
                title="Any usage of Family Planning methods before Pregnancy" 
                index={9} 
                placeholder="Family Planning Methods" 
                value={formObject["family_planning_methods"] || ""} 
                onChange={(filed, e) => {
                    setData(filed , "family_planning_methods" , e.target.value)
                }} 
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-10">Current pregnancy status</h3>

      {/* Diseases */}
        <div className="m-10">
            {currentPregnancyStatus.map((condition, index) => (
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

      <h3 className="text-xl mt-12">
        <span className="font-bold">Other Situations</span>
      </h3>

      <div className="mt-12">
        <div className="m-12">
          {otherSituations.map((condition, index) => (
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

export default Pregnancy2;
