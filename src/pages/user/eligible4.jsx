import { errorType, Toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import CustomPagination from "@/components/userComponents/customPagination";
import YesNoButton from "@/components/userComponents/yesNoButton";
import {
  facilities1,
  facilities2,
  habits1,
  habits2,
} from "@/data/eligibleData";
import { useTitle } from "@/hooks/useTitle";
import EligibleService from "@/service/eligibleService";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Eligible4 = () => {
  useTitle("Recovery Checklist - Page 4");
  const [formObject, setFormObject] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const initiateFields = () => {
    const initialData = {};

    habits1.forEach((habit) => {
      initialData[habit.name + "_woman"] = false;
      initialData[habit.name + "_man"] = false;
      initialData[habit.name + "_other"] = "";
    });

    habits2.forEach((habit) => {
      initialData[habit.name + "_woman"] = false;
      initialData[habit.name + "_man"] = false;
      initialData[habit.name + "_other"] = "";
    });

    facilities1.forEach((facility) => {
      initialData[facility.name + "_woman"] = false;
      initialData[facility.name + "_man"] = false;
      initialData[facility.name + "_other"] = "";
    });

    initialData["hazardous_woman"] = false;
    initialData["hazardous_man"] = false;
    initialData["hazardous_other"] = "";

    facilities2.forEach((facility) => {
      initialData[facility.name + "_woman"] = false;
      initialData[facility.name + "_man"] = false;
      initialData[facility.name + "_other"] = "";
    });

    initialData["noisy_woman"] = false;
    initialData["noisy_man"] = false;
    initialData["noisy_other"] = "";

    initialData["saving_woman"] = false;
    initialData["saving_man"] = false;
    initialData["saving_other"] = "";

    return initialData;
  };

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = async () => {
    formObject.stage = Math.max(formObject.stage, 5);
    localStorage.setItem("formObject", JSON.stringify(formObject));

    await handleSubmit();
  };

  const handleSubmit = async () => {
    const formData = EligibleService.createObject(formObject);

    try {
      const response = await EligibleService.addEligibleInfo(formData);
      Toast(response, errorType.SUCCESS);
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

          console.log(newErrors);
        } else {
          console.log(data);
          Toast(data || "Error occurred", errorType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return { stage: 1 };
    };

    const obj2 = initiateFields();
    const obj1 = getFromLocalStorage();
    setFormObject({ ...formObject, ...obj2, ...obj1 });
    setIsLoading(false);
  }, []);

  if (!isLoading && (!formObject || !formObject.stage)) {
    return <Navigate to={"/eligible/1"} />;
  }

  if (!isLoading && formObject.stage < 4) {
    return <Navigate to={"/eligible/3"} />;
  }

  return (
    <div className="container my-10 font-poppins">
      <Heading title={"Family health information"} />

      <ul className="list-disc mt-12">
        <li>
          Risky habits and vices such as alcohol, drugs, smoking, violent
          behavior, casual sexual behavior, family happiness, harmony and
          Health, the economy also cause collapse. It is our responsibility to
          guide you to get rid of the above habits and to encourage you both to
          engage in activities that improve mental health such as physical
          fitness/hobbies.
        </li>
      </ul>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Wife</p>
          <p className="text-center">Husband</p>
          <p></p>
        </div>

        <div className=" items-center mt-4">
          <p>1. Do you use the following?</p>
        </div>

        {habits1.map((habit, index) => (
          <EligibleCardBoolInput
            key={index}
            title={habit.title}
            placeholder={habit.placeholder}
            value1={formObject[habit.name + "_woman"] || false}
            value2={formObject[habit.name + "_man"] || false}
            value3={formObject[habit.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, habit.name, e);
            }}
          />
        ))}

        {habits2.map((habit, index) => (
          <EligibleCardBoolInput
            key={index}
            index={index + 1}
            title={habit.title}
            placeholder={habit.placeholder}
            value1={formObject[habit.name + "_woman"] || false}
            value2={formObject[habit.name + "_man"] || false}
            value3={formObject[habit.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, habit.name, e);
            }}
          />
        ))}
      </div>

      <h3 className="text-xl mt-12">Home and workplace</h3>

      <ul className="list-disc mt-4">
        <li className="mt-4">
          The purpose of this is to educate both of you about safe drinking
          water/sanitary toilet usage as well as a safe environment
        </li>
      </ul>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Wife</p>
          <p className="text-center">Husband</p>
          <p></p>
        </div>

        <div className=" items-center mt-4">
          <p>1. Do you have basic health facilities in your home?</p>
        </div>

        {facilities1.map((facility, index) => (
          <EligibleCardBoolInput
            key={index}
            title={facility.title}
            placeholder={facility.placeholder}
            value1={formObject[facility.name + "_woman"] || false}
            value2={formObject[facility.name + "_man"] || false}
            value3={formObject[facility.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, facility.name, e);
            }}
          />
        ))}

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p>
            2. Are there any hazardous situations in the environment/garden
            around your home? (Weeds in open pits. Unsecured lings, dilapidated
            shacks, dengue hotspots, unsecured kerosene bottles.)
          </p>
          <YesNoButton
            onChange={(e) => setData("woman", "hazardous", e)}
            value={formObject.hazardous_woman || false}
          />
          <YesNoButton
            onChange={(e) => setData("man", "hazardous", e)}
            value={formObject.hazardous_man || false}
          />
          <TextField
            label="Other Details"
            variant="outlined"
            className="w-72"
            value={formObject.hazardous_other || ""}
            onChange={(e) => setData("other", "hazardous", e.target.value)}
          />
        </div>

        <div className=" items-center mt-4">
          <p>3. Are you exposed to the following at home or at work?</p>
        </div>

        {facilities2.map((facility, index) => (
          <EligibleCardBoolInput
            key={index}
            title={facility.title}
            placeholder={facility.placeholder}
            value1={formObject[facility.name + "_woman"] || false}
            value2={formObject[facility.name + "_man"] || false}
            value3={formObject[facility.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, facility.name, e);
            }}
          />
        ))}

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p>4. Do you live/work in a noisy environment?</p>
          <YesNoButton
            onChange={(e) => setData("woman", "noisy", e)}
            value={formObject.noisy_woman || false}
          />
          <YesNoButton
            onChange={(e) => setData("man", "noisy", e)}
            value={formObject.noisy_man || false}
          />
          <TextField
            label="Other Details"
            variant="outlined"
            className="w-72"
            value={formObject.noisy_other || ""}
            onChange={(e) => setData("other", "noisy", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p>
            5. Do you have financial management skills? (Money saving methods)
          </p>
          <YesNoButton
            onChange={(e) => setData("woman", "saving", e)}
            value={formObject.saving_woman || false}
          />
          <YesNoButton
            onChange={(e) => setData("man", "saving", e)}
            value={formObject.saving_man || false}
          />
          <TextField
            label="Other Details"
            variant="outlined"
            className="w-72"
            value={formObject.saving_other || ""}
            onChange={(e) => setData("other", "saving", e.target.value)}
          />
        </div>
      </div>

      <Button className="float-right" onClick={handleSave}>
        Save and Submit
      </Button>

      <div className="flex w-full mt-24">
        <CustomPagination path={"/eligible/"} total={5} current={4} />
      </div>
    </div>
  );
};

export default Eligible4;
