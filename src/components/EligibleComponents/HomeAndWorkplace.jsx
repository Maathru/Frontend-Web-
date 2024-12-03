import YesNoButton from "../userComponents/yesNoButton";
import EligibleCardBoolInput from "../userComponents/eligibleCardBoolInput";
import { facilities1, facilities2 } from "@/data/eligibleData";
import { useEffect } from "react";
import { Button } from "../ui/button";
import EligibleService from "@/service/eligibleService";
import { errorType, Toast } from "../toast";
import MinHeightTextarea from "../userComponents/minHeightTextarea";
import { useLocation } from "react-router-dom";
import { getQueryParam } from "@/utils/getQueryParam";

const HomeAndWorkplace = ({ formObject, setFormObject, handleChange }) => {
  const location = useLocation();

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = async (e) => {
    localStorage.setItem("formObject", JSON.stringify(formObject));

    await handleSubmit();

    handleChange(e, 3);
  };

  const handleSubmit = async () => {
    const formData = EligibleService.createObject(formObject);

    try {
      const response = await EligibleService.addEligibleInfo(
        getQueryParam("user", location),
        formData
      );
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
    if (formObject.stage < 3) {
      handleChange(undefined, 1);
    }
  });

  return (
    <>
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

          <MinHeightTextarea
            value={formObject.hazardous_other || ""}
            placeholder="Other Details"
            disabled={false}
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

          <MinHeightTextarea
            value={formObject.noisy_other || ""}
            placeholder="Other Details"
            disabled={false}
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

          <MinHeightTextarea
            value={formObject.saving_other || ""}
            placeholder="Other Details"
            disabled={false}
            onChange={(e) => setData("other", "saving", e.target.value)}
          />
        </div>
      </div>

      <Button className="float-right" onClick={handleSave}>
        Save and Submit
      </Button>
    </>
  );
};

export default HomeAndWorkplace;
