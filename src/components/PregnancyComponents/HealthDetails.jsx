import { useEffect } from "react";
import { Button } from "../ui/button";
import SingleInput from "../userComponents/singleInput";
import FourInputs from "../userComponents/fourInputs";
import { prenatalCare, prenatalCare1 } from "@/data/pregnancyData";
import BoolTextInput from "../userComponents/boolTextInput";
import DateInput from "../userComponents/dateInput";

const HealthDetails = ({
  formObject,
  setFormObject,
  handleChange,
  handleChangePostnatalCare,
}) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject((prevState) => ({ ...prevState, ...newObject }));
  };

  const handleSave = (e) => {
    localStorage.setItem("pregnancy", JSON.stringify(formObject));
    handleChangePostnatalCare(e, 1);
  };

  useEffect(() => {
    if (formObject.stage < 3) {
      // handleChange(undefined, 0);
    }
  });
  return (
    <>
      {/* Input box */}

      <div>
        <DateInput
          title="Date of Arrival"
          placeholder="Date of Arrival"
          value={formObject["date_of_arrival"] || ""}
          onChange={(filed, e) => {
            setData(filed, "date_of_arrival", e);
          }}
        />

        <SingleInput
          title="Weeks in to pregnancy"
          placeholder="Weeks in to pregnancy"
          value={formObject["weeks_into_pregnancy"] || ""}
          onChange={(filed, e) => {
            setData(filed, "weeks_into_pregnancy", e.target.value);
          }}
        />

        {prenatalCare1.map((condition, index) => (
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

        {prenatalCare.map((input, index) => (
          <FourInputs
            key={index}
            title={input.title}
            placeholder1={input.placeholder}
            placeholder2={input.placeholder}
            placeholder3={input.placeholder}
            placeholder4={input.placeholder}
            value1={formObject[input.name] || ""}
            value2={formObject[input.name] || ""}
            value3={formObject[input.name] || ""}
            value4={formObject[input.name] || ""}
            onChange={(filed, e) => {
              setData(filed, input.name, e.target.value);
            }}
          />
        ))}

        <SingleInput
          title="Leave the area temporally"
          placeholder=""
          value={formObject["leave"] || ""}
          onChange={(filed, e) => {
            setData(filed, "leave", e.target.value);
          }}
        />

        <SingleInput
          title="Letters about it"
          placeholder=""
          value={formObject["leave_letter"] || ""}
          onChange={(filed, e) => {
            setData(filed, "leave_letter", e.target.value);
          }}
        />
      </div>

      <Button className="float-right" onClick={handleSave}>
        Save and Next
      </Button>
    </>
  );
};

export default HealthDetails;
