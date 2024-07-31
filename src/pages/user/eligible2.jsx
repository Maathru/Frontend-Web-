import SpeciallyWomenInput from "@/components/userComponents/speciallyWomenInput";
import { TextField } from "@mui/material";
import YesNoButton from "@/components/userComponents/yesNoButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import { Navigate, useNavigate } from "react-router-dom";
import CustomPagination from "@/components/userComponents/customPagination";
import { Button } from "@/components/ui/button";
import {
  specials1,
  specials2,
  specials3,
  specials4,
} from "@/data/eligibleData";
import { useTitle } from "@/hooks/useTitle";
import Heading from "@/components/ui/heading";

const Eligible2 = () => {
  useTitle("Recovery Checklist - Page 2");
  const [formObject, setFormObject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const initiateFields = () => {
    const initialData = {};

    specials1.forEach((special) => {
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    initialData["periods_woman"] = false;
    initialData["periods_other"] = "";
    initialData["periods_pattern"] = "Orderly";

    specials2.forEach((special) => {
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    specials4.forEach((special) => {
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    specials3.forEach((special) => {
      initialData[special.name + "_man"] = false;
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    initialData["breast_woman"] = false;
    initialData["breast_other"] = "";

    return initialData;
  };

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = () => {
    formObject.stage = Math.max(formObject.stage, 3);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    navigate("/eligible/3");
  };

  const handleChange = (e) => {
    setFormObject({ ...formObject, periods_pattern: e.target.value });
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return { stage: 1 };
    };

    const obj2 = initiateFields();
    const obj1 = getFromLocalStorage();
    setFormObject({ ...formObject, ...obj2, ...obj1 });
    setIsLoading(false);
  }, []);

  if (!isLoading && (!formObject || !formObject.stage)) {
    return <Navigate to={"/eligible/1"} />;
  }

  if (!isLoading && formObject.stage < 2) {
    return <Navigate to={"/eligible/1"} />;
  }

  return (
    <div className="container my-10 font-poppins">
      <Heading />
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
            onChange={handleChange}
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

      <h3 className="text-xl mt-12">
        FOR <span className="font-bold">BOTH</span>
      </h3>

      <div className="grid grid-cols-4 gap-4 items-center mt-4 mb-8">
        <p></p>
        <p className="text-center">Wife</p>
        <p className="text-center">Husband</p>
      </div>

      {specials3.map((special, index) => (
        <EligibleCardBoolInput
          key={index}
          index={index + 5}
          title={special.title}
          placeholder={special.placeholder}
          value1={formObject[special.name + "_woman"] || false}
          value2={formObject[special.name + "_man"] || false}
          value3={formObject[special.name + "_other"] || ""}
          onChange={(filed, e) => {
            setData(filed, special.name, e);
          }}
        />
      ))}

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>9. Do you do breast self-examination once a month?</p>
        <YesNoButton
          onChange={(e) => setData("woman", "breast", e)}
          value={formObject.breast_woman || false}
        />
        <p></p>
        <TextField
          label="Other Details"
          variant="outlined"
          className="w-72"
          value={formObject.breast_other || ""}
          onChange={(e) => setData("other", "breast", e.target.value)}
        />
      </div>

      <Button className="float-right mt-10" onClick={handleSave}>
        Save and Next
      </Button>

      <div className="flex w-full mt-24">
        <CustomPagination path={"/eligible/"} total={5} current={2} />
      </div>
    </div>
  );
};

export default Eligible2;
