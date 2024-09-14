import { familyDisease } from "@/data/pregnancyData";
import BoolTextInput from "../userComponents/boolTextInput";
import { Button } from "../ui/button";

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

  const handleSave = (e) => {
    localStorage.setItem("formObject", JSON.stringify(formObject));
    handleChangeMainDetails(e, 2);
  };

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
