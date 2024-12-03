import { currentPregnancyStatus, otherSituations } from "@/data/pregnancyData";
import { Button } from "../ui/button";
import BoolTextInput from "../userComponents/boolTextInput";
import PregnancyService from "@/service/pregnancyService";
import { errorType, Toast } from "../toast";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getQueryParam } from "@/utils/getQueryParam";

const CurrentPregnancyStatus = ({
  formObject,
  setFormObject,
  handleChange,
}) => {
  const location = useLocation();

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject((prevState) => ({ ...prevState, ...newObject }));
  };

  const handleSave = async (e) => {
    formObject.stage = Math.max(formObject.stage, 2);
    localStorage.setItem("pregnancy", JSON.stringify(formObject));
    await handleSubmit();
    handleChange(e, 1);
  };

  const handleSubmit = async () => {
    const formData =
      PregnancyService.mapFormObjectToCurrentPregnancy(formObject);

    try {
      const response = await PregnancyService.saveCurrentPregnancy(
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
    const fetchCurrentPregnancy = async () => {
      try {
        const response = await PregnancyService.getCurrentPregnancy(
          getQueryParam("user", location)
        );

        const existing =
          PregnancyService.mapCurrentPregnancyToFormObject(response);
        setFormObject((prevState) => ({ ...prevState, ...existing }));
      } catch (error) {
        console.log(error.message);

        console.log(error);
        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchCurrentPregnancy();
  }, []);

  return (
    <>
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

      <Button onClick={handleSave}>Save and Next</Button>
    </>
  );
};

export default CurrentPregnancyStatus;
