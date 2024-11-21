import { meals, nutrition } from "@/data/eligibleData";
import EligibleCardBoolInput from "../userComponents/eligibleCardBoolInput";
import YesNoButton from "../userComponents/yesNoButton";
import { useEffect } from "react";
import { Button } from "../ui/button";
import MinHeightTextarea from "../userComponents/minHeightTextarea";

const FamilyNutrition = ({
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
    handleChangeFamilyHealth(e, 2);
  };

  useEffect(() => {
    return () => {
      if (formObject.stage < 3) {
        handleChange(undefined, 1);
      }
    };
  });

  return (
    <>
      <h3 className="text-xl mt-12">Family nutrition</h3>

      <ul className="list-disc mt-4">
        <li className="mt-4">
          Eating a mixed diet (starches, proteins, fats, as well as vitamins and
          minerals in the right amount on a daily basis) will help the health of
          the womb and good nutritional habits to improve the health of the
          family, as well as the mother to give birth to healthy children in the
          future. Focusing is our goal
        </li>
      </ul>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Wife</p>
          <p className="text-center">Husband</p>
          <p></p>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p>1. Did you have 3 main meals for the day?</p>
          <YesNoButton
            onChange={(e) => setData("woman", "meal", e)}
            value={formObject.meal_woman || false}
          />
          <YesNoButton
            onChange={(e) => setData("man", "meal", e)}
            value={formObject.meal_man || false}
          />

          <MinHeightTextarea
            value={formObject.meal_other || ""}
            placeholder="Other Details"
            disabled={false}
            onChange={(e) => setData("other", "meal", e.target.value)}
          />
        </div>

        {meals.map((meal, index) => (
          <EligibleCardBoolInput
            key={index}
            title={meal.title}
            placeholder={meal.placeholder}
            value1={formObject[meal.name + "_woman"] || false}
            value2={formObject[meal.name + "_man"] || false}
            value3={formObject[meal.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, meal.name, e);
            }}
          />
        ))}

        {nutrition.map((n, index) => (
          <EligibleCardBoolInput
            key={index}
            index={index + 1}
            title={n.title}
            placeholder={n.placeholder}
            value1={formObject[n.name + "_woman"] || false}
            value2={formObject[n.name + "_man"] || false}
            value3={formObject[n.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, n.name, e);
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

export default FamilyNutrition;
