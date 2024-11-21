import { familyDisease } from "@/data/pregnancyData";
import BoolTextInput from "../userComponents/boolTextInput";
import { Button } from "../ui/button";
import PregnancyService from "@/service/pregnancyService";
import { errorType, Toast } from "../toast";
import { useEffect } from "react";

const FamilyHistoryDetails = ({
  formObject,
  setFormObject,
  handleChangeMainDetails,
}) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject((prevState) => ({ ...prevState, ...newObject }));
  };

  const handleSave = async (e) => {
    localStorage.setItem("pregnancy", JSON.stringify(formObject));
    await handleSubmit();
    handleChangeMainDetails(e, 2);
  };

  const handleSubmit = async () => {
    const formData = PregnancyService.mapFormObjectToFamilyHistory(formObject);

    try {
      const response = await PregnancyService.saveFamilyHistory(formData);
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
    const fetchFamilyHistory = async () => {
      try {
        const response = await PregnancyService.getFamilyHistory();

        const existing =
          PregnancyService.mapFamilyHistoryToFormObject(response);
        setFormObject((prevState) => ({ ...prevState, ...existing }));
      } catch (error) {
        console.log(error.message);

        console.log(error);
        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    return () => {
      fetchFamilyHistory();
    };
  }, []);

  return (
    <>
      {/* Form container */}
      <div className="mt-10">
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

      <Button onClick={handleSave}>Save and Next</Button>
    </>
  );
};

export default FamilyHistoryDetails;
