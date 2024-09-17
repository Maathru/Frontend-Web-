import { conditions1 } from "@/data/eligibleData";
import EligibleCardBoolInput from "../userComponents/eligibleCardBoolInput";
import { Button } from "../ui/button";
import { useEffect } from "react";
import YesNoButton from "../userComponents/yesNoButton";
import MinHeightTextarea from "../userComponents/minHeightTextarea";

const ForBoth = ({
  formObject,
  setFormObject,
  handleChange,
  handleChangeHealth,
}) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject((prevState) => ({ ...prevState, ...newObject }));
  };

  const handleSave = (e) => {
    localStorage.setItem("formObject", JSON.stringify(formObject));
    handleChangeHealth(e, 1);
  };

  useEffect(() => {
    return () => {
      if (formObject.stage < 2) {
        handleChange(undefined, 0);
      }
    };
  });

  return (
    <>
      {/* Diseases */}
      <div className="mt-24">
        <h2 className="text-2xl">
          Details of medical conditions (Do you have or have you ever had any of
          the following medical conditions? )
        </h2>

        <div className="m-12">
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <p></p>
            <p className="text-center">Wife</p>
            <p className="text-center">Husband</p>
            <p></p>
          </div>

          {conditions1.map((condition, index) => (
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

          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <p>17. Do you do breast self-examination once a month?</p>
            <YesNoButton
              onChange={(e) => setData("woman", "breast", e)}
              value={formObject.breast_woman || false}
            />
            <p></p>
            <MinHeightTextarea
              value={formObject.breast_other || ""}
              placeholder="Other Details"
              disabled={false}
              onChange={(e) => setData("other", "breast", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button className="float-right" onClick={handleSave}>
        Save and Next
      </Button>
    </>
  );
};

export default ForBoth;
