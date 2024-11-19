import { currentPregnancyStatus, otherSituations } from "@/data/pregnancyData";
import { Button } from "../ui/button";
import BoolTextInput from "../userComponents/boolTextInput";

const CurrentPregnancyStatus = ({
  formObject,
  setFormObject,
  handleChange,
}) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject((prevState) => ({ ...prevState, ...newObject }));
  };

  const handleSave = (e) => {
    formObject.stage = Math.max(formObject.stage, 2);
    localStorage.setItem("pregnancy", JSON.stringify(formObject));
    handleChange(e, 1);
  };

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
