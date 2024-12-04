import { specials1, specials2, specials4 } from "@/data/eligibleData";
import SpeciallyWomenInput from "../userComponents/speciallyWomenInput";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { Button } from "../ui/button";

const SpeciallyForWoman = ({ formObject, setFormObject, handleChange }) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = (e) => {
    formObject.stage = Math.max(formObject.stage, 3);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    handleChange(e, 2);
  };

  useEffect(() => {
    if (formObject.stage < 2) {
      handleChange(undefined, 0);
    }
  });

  return (
    <div>
      <div>
        <h2 className="text-2xl mt-12">
          Details of medical conditions (Do you have or have you ever had any of
          the following medical conditions? )
        </h2>
        <h3 className="text-xl mt-8">
          SPECIALLY FOR <span className="font-bold">FEMALES</span>
        </h3>

        <div>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <p></p>
            <p className="text-center">Wife</p>
            <p></p>
          </div>

          {specials1.map((special, index) => (
            <SpeciallyWomenInput
              key={index}
              index={index}
              title={special.title}
              placeholder={special.placeholder}
              value1={formObject[special.name + "_woman"] || false}
              value2={formObject[special.name + "_other"] || ""}
              onChange={(filed, e) => {
                setData(filed, special.name, e);
              }}
            />
          ))}
        </div>
        <ul className="list-disc mt-12">
          <li>
            Getting the rubella vaccine before pregnancy (before conception) can
            prevent the baby from developing congenital rubella syndrome. This
            vaccine should be taken at least 3 months before conception.
          </li>
          <li className="mt-4">
            A pregnant woman should take 1 tablet of folic acid daily from about
            6 months ago. This leads to the prevention of disorders related to
            the child's brain and nervous system.
          </li>
        </ul>

        <h3 className="text-xl mt-12">Main Details</h3>

        <ul className="list-disc mt-6">
          <li>
            There may be some difficulties during the monthly menstrual cycle of
            women and during sexual relations between you two. Successful
            intercourse is essential for sub-sexual satisfaction. Also mention
            here the details of the family organizations used by both of you.
          </li>
        </ul>
      </div>

      {/* main details */}
      <h3 className="text-xl mt-12">
        SPECIALLY FOR <span className="font-bold">FEMALES</span>
      </h3>

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p></p>
        <p className="text-center">Wife</p>
        <p></p>
      </div>

      <SpeciallyWomenInput
        index={0}
        title={"Are your periods monthly?"}
        placeholder={"No. of Days"}
        value1={formObject["periods_woman"] || false}
        value2={formObject["periods_other"] || ""}
        onChange={(filed, e) => {
          setData(filed, "periods", e);
        }}
      />

      <div className="grid grid-cols-4 gap-4 items-center">
        <p></p>
        <FormControl>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            className="mx-auto"
            value={formObject.periods_pattern || "Orderly"}
            onChange={(e) => setData("pattern", "periods", e.target.value)}
          >
            <FormControlLabel
              value="Orderly"
              control={<Radio size="small" color="secondary" />}
              label="Orderly"
            />
            <FormControlLabel
              value="Irregular"
              control={<Radio size="small" color="secondary" />}
              label="Irregular"
            />
          </RadioGroup>
        </FormControl>
      </div>

      {specials2.map((special, index) => (
        <SpeciallyWomenInput
          key={index}
          index={index + 1}
          title={special.title}
          placeholder={special.placeholder}
          value1={formObject[special.name + "_woman"] || false}
          value2={formObject[special.name + "_other"] || ""}
          onChange={(filed, e) => {
            setData(filed, special.name, e);
          }}
        />
      ))}

      <h3 className="text-lg mt-12">
        Do you have a history of the following conditions?
      </h3>

      {specials4.map((special, index) => (
        <SpeciallyWomenInput
          key={index}
          title={special.title}
          placeholder={special.placeholder}
          value1={formObject[special.name + "_woman"] || false}
          value2={formObject[special.name + "_other"] || ""}
          onChange={(filed, e) => {
            setData(filed, special.name, e);
          }}
        />
      ))}

      <Button className="float-right" onClick={handleSave}>
        Save and Next
      </Button>
    </div>
  );
};

export default SpeciallyForWoman;
