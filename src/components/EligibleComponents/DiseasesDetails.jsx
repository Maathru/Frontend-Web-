import { conditions2 } from "@/data/eligibleData";
import EligibleCardBoolInput from "../userComponents/eligibleCardBoolInput";
import { useEffect } from "react";
import { Button } from "../ui/button";

const DiseasesDetails = ({
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
    handleChangeFamilyHealth(e, 1);
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
      <ul className="list-disc mt-12">
        <li>
          It is important to know about certain disease conditions (hereditary
          diseases) that your mother, father or blood relatives may have because
          you may be at risk of developing those conditions.
        </li>
        <li className="mt-4">
          This allows you to pay special attention to it during pregnancy and in
          addition, it will help to prevent or minimize these diseases for you
          and your children.
        </li>
      </ul>

      <p className="mt-8">
        Do you, father or brothers/sisters suffer from the following diseases?
      </p>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Wife</p>
          <p className="text-center">Husband</p>
          <p></p>
        </div>

        {conditions2.map((condition, index) => (
          <EligibleCardBoolInput
            key={index}
            index={index}
            title={condition.title}
            placeholder={condition.placeholder}
            value1={formObject[condition.name + "_woman"] || false}
            value2={formObject[condition.name + "_man"] || false}
            value3={formObject[condition.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, condition.name, e);
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

export default DiseasesDetails;
