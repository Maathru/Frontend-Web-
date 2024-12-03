import { habits1, habits2 } from "@/data/eligibleData";
import EligibleCardBoolInput from "../userComponents/eligibleCardBoolInput";
import { useEffect } from "react";
import { Button } from "../ui/button";

const Habits = ({
  formObject,
  setFormObject,
  handleChange,
  handleChangeFamilyHealth,
}) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = (e) => {
    localStorage.setItem("formObject", JSON.stringify(formObject));
    handleChangeFamilyHealth(e, 3);
  };

  useEffect(() => {
    if (formObject.stage < 3) {
      handleChange(undefined, 1);
    }
  });
  return (
    <>
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

      <Button className="float-right" onClick={handleSave}>
        Save and Next
      </Button>
    </>
  );
};

export default Habits;
