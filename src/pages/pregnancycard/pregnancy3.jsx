import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import DateInput from "@/components/userComponents/dateInput";
import { Button } from "@/components/ui/button";
import EligiblePagination from "@/components/userComponents/eligiblePagination";
import { prenatalCare} from "@/data/pregnancyData"
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import PageHeading from "@/components/ui/pageHeading";
import { useTranslation } from "react-i18next";
import SingleInput from "@/components/userComponents/singleInput";

const Pregnancy3 = () => {
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
    prenatalCare.forEach((input) => {
        initialData[input.name] = "";
    });
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
      <PageHeading title={title + " | Prenatal care Related"} />

        <p className="text-xl font-bold mt-8">
          Mother&apos;s Name : A.P. Gamage
        </p>

      </div>

      {/* Form section */}
      <div className="mt-20">

        {/* Form container */}
        <div className="mt-10">
          {/* Input box */}

          <div>
            <DateInput
                title="Date of Arrival"
                index={0}
                placeholder="Date of Arrival"
                value={formObject["date_of_arrival"] || ""}
                onChange={(filed, e) => {
                    setData(filed, "date_of_arrival", e);
                }}
            />

            <SingleInput
                title="Weeks in to pregnancy"
                index={1}
                placeholder="Weeks in to pregnancy"
                value={formObject["weeks_into_pregnancy"] || ""}
                onChange={(filed, e) => {
                    setData(filed, "weeks_into_pregnancy", e.target.value);
                }}
            />

            {prenatalCare.map((input, index) => (
                <SingleInput
                    key={index+2}
                    title={input.title}
                    index={index + 2}
                    placeholder={input.placeholder}
                    value={formObject[input.name] || ""}
                    onChange={(filed, e) => {
                        setData(filed, input.name, e.target.value);
                    }}
                />
                ) 
            )}
            
            <div className="ml-14">
                <EligibleCardBoolInput
                    title="Attendance"
                    index={22}
                    placeholder=""
                    value1={formObject["attendance_man"] || ""}
                    value2={formObject["attendance_woman"] || ""}
                    value3={formObject["attendance_other"] || ""}
                    onChange={(filed, e) => {
                        setData(filed, "attendance", e);
                    }}
                />
            </div>

            <SingleInput 
                title="Leave the area temporally" 
                index={26} 
                placeholder="" 
                value={formObject["leave"] || ""} 
                onChange={(filed, e) => {
                    setData(filed , "leave" , e.target.value)
                }} 
            />

            <SingleInput 
                title="Letters about it" 
                index={27} 
                placeholder="" 
                value={formObject["leave_letter"] || ""} 
                onChange={(filed, e) => {
                    setData(filed , "leave_letter" , e.target.value)
                }} 
            />
          </div>
        </div>
      </div>

      <Button onClick={handleSave}>Save and Next</Button>

      <div className="flex w-full mt-24">
        <EligiblePagination total={4} current={1} />
      </div>
    </div>
  );
};

export default Pregnancy3;
