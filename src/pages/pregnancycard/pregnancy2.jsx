import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BoolTextInput from "@/components/userComponents/boolTextInput";
import DoubleInput from "@/components/userComponents/doubleInput";
import DateInput from "@/components/userComponents/dateInput";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/userComponents/customPagination";
import {
  presentObstetricDates,
  currentPregnancyStatus,
  otherSituations,
} from "@/data/pregnancyData";
import Heading from "@/components/ui/heading";
import { useTranslation } from "react-i18next";
import SingleInput from "@/components/userComponents/singleInput";
import { useTitle } from "@/hooks/useTitle";
import { TextField } from "@mui/material";

const Pregnancy2 = () => {
  useTitle("Pregnancy Card - Page 2");
  const [formObject, setFormObject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation("pregnancy2");

  const initiateFields = () => {
    const initialData = {};

    initialData.pregnancies_g = "";
    initialData.pregnancies_p = "";
    initialData.living_children = "";

    presentObstetricDates.forEach((input) => {
      initialData[input.name] = "";
    });

    initialData.gestational_weeks = "";
    initialData.family_methods_type = "";
    initialData.family_methods = "";

    currentPregnancyStatus.forEach((input) => {
      initialData[input.name] = "";
      initialData[input.name + "_other"] = "";
    });

    otherSituations.forEach((input) => {
      initialData[input.name] = "";
      initialData[input.name + "_other"] = "";
    });

    return initialData;
  };

  const setData = (field, value) => {
    const newObject = {};
    newObject[field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = async () => {
    formObject.stage = Math.max(formObject.stage, 3);
    localStorage.setItem("pregnancy", JSON.stringify(formObject));
    navigate("/parents");

    await handleSubmit();
  };

  const handleSubmit = async () => {};

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("pregnancy");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return { stage: 1 };
    };

    const obj1 = initiateFields();
    const obj2 = getFromLocalStorage();
    setFormObject((prev) => ({ ...prev, ...obj1, ...obj2 }));

    setIsLoading(false);
  }, []);

  if (!isLoading && (!formObject || !formObject.stage)) {
    return <Navigate to={"/pregnancy/1"} />;
  }

  if (!isLoading && formObject.stage < 2) {
    return <Navigate to={"/pregnancy/1"} />;
  }

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
        <Heading title={t("title")} />

        <p className="text-xl font-bold mt-8">
          Mother&apos;s Name : A.P. Gamage
        </p>
      </div>

      {/* Form section */}
      <div className="mt-10">
        <div className="w-fit">
          <ul className="list-disc ps-8">
            <li className="font-semibold text-xl">Pregnancy history</li>
          </ul>
        </div>

        {/* Form container */}
        <div className="mt-10">
          {/* Input box */}
          <p>Current pregnancy:</p>
          <div>
            <DoubleInput
              title="How Many Pregnancies for now?"
              value1={formObject["pregnancies_g"] || ""}
              value2={formObject["pregnancies_p"] || ""}
              placeholder1="G"
              placeholder2="P"
              onChange={(field, value) => {
                setData(field, value);
              }}
            />

            <SingleInput
              type="number"
              title="How many living children do you have?"
              placeholder="No of Living Children"
              value={formObject["living_children"] || ""}
              onChange={(value) => {
                setData("living_children", value);
              }}
            />

            <DateInput
              title="Birthday of the youngest child?"
              placeholder="Birthday of the youngest child"
              value={formObject.youngest_child_dob}
              onChange={(value) => setData("youngest_child_dob", value)}
            />
          </div>

          <div className="mt-10">
            <div className="w-fit">
              <ul className="list-disc ps-8">
                <li className="font-semibold text-xl">
                  Past pregnancy details
                </li>
              </ul>
            </div>
            <div>Need to implement</div>
          </div>

          <div className="mt-10 bg-purple-100 py-5 rounded-lg">
            {presentObstetricDates.map((input, index) => (
              <DateInput
                key={index}
                title={input.title}
                placeholder={input.title}
                value={formObject[input.name] || ""}
                onChange={(value) => setData(input.name, value)}
              />
            ))}

            <SingleInput
              title="Number of gestational weeks at enrollment"
              placeholder="Gestational Weeks"
              value={formObject["gestational_weeks"] || ""}
              onChange={(field, value) => {
                setData(field, "gestational_weeks", value);
              }}
            />

            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <ul className="list-disc ps-8">
                <li>Any usage of Family Planning methods before Pregnancy</li>
              </ul>
              <TextField
                value={formObject.family_methods_type || ""}
                variant="outlined"
                className="w-96"
                onChange={(e) => setData("family_methods_type", e.target.value)}
              />
              <TextField
                value={formObject.family_methods || ""}
                label="The Methods?"
                variant="outlined"
                className="w-96"
                onChange={(e) => onChange("family_methods", e.target.value)}
              />
            </div>
          </div>

          <div className="w-fit mt-10">
            <ul className="list-disc ps-8">
              <li className="font-semibold text-xl">Current Pregnancy</li>
            </ul>
          </div>

          <div>
            {currentPregnancyStatus.map((input, index) => (
              <BoolTextInput
                key={index}
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

          <div className="w-fit mt-10">
            <ul className="list-disc ps-8">
              <li className="font-semibold text-xl">Other Situations</li>
            </ul>
          </div>

          <div>
            {otherSituations.map((input, index) => (
              <BoolTextInput
                key={index}
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
        <Button onClick={handleSave}>Save and Submit</Button>

        <div className="flex w-full mt-24">
          <CustomPagination path={"/pregnancy/"} total={4} current={2} />
        </div>
      </div>
    </div>
  );
};

export default Pregnancy2;
