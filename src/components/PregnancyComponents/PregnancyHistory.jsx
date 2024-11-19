import { TextField } from "@mui/material";
import SingleInput from "../userComponents/singleInput";
import DateInput from "../userComponents/dateInput";
import DoubleInput from "../userComponents/doubleInput";
import { Button } from "../ui/button";
import { presentObstetricDates } from "@/data/pregnancyData";

const PregnancyHistory = ({
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
    localStorage.setItem("pregnancy", JSON.stringify(formObject));
    handleChangeMainDetails(e, 3);
  };

  return (
    <>
      <div className="w-fit">
        <ul className="list-disc ps-8">
          <li className="font-semibold text-xl">Pregnancy history</li>
        </ul>
      </div>

      {/* Input box */}
      <p>Current pregnancy:</p>
      <div>
        <DoubleInput
          title="How Many Pregnancies for now?"
          value1={formObject["pregnancies_g"] || ""}
          value2={formObject["pregnancies_p"] || ""}
          placeholder1="G"
          placeholder2="P"
          onChange={(field, value) => {
            setData(field, value);
          }}
        />

        <SingleInput
          type="number"
          title="How many living children do you have?"
          placeholder="No of Living Children"
          value={formObject["living_children"] || ""}
          onChange={(value) => {
            setData("living_children", value);
          }}
        />

        <DateInput
          title="Birthday of the youngest child?"
          placeholder="Birthday of the youngest child"
          value={formObject.youngest_child_dob}
          onChange={(value) => setData("youngest_child_dob", value)}
        />
      </div>

      <div className="mt-10">
        <div className="w-fit">
          <ul className="list-disc ps-8">
            <li className="font-semibold text-xl">Past pregnancy details</li>
          </ul>
        </div>
        {/* <div>Need to implement</div> */}
      </div>

      <div className="mt-10 bg-purple-100 dark:bg-dark-card py-5 rounded-lg">
        {presentObstetricDates.map((input, index) => (
          <DateInput
            key={index}
            title={input.title}
            placeholder={input.title}
            value={formObject[input.name] || ""}
            onChange={(value) => setData(input.name, value)}
          />
        ))}

        <SingleInput
          title="Number of gestational weeks at enrollment"
          placeholder="Gestational Weeks"
          value={formObject["gestational_weeks"] || ""}
          onChange={(field, value) => {
            setData(field, "gestational_weeks", value);
          }}
        />

        <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
          <ul className="list-disc ps-8">
            <li>Any usage of Family Planning methods before Pregnancy</li>
          </ul>
          <TextField
            value={formObject.family_methods_type || ""}
            variant="outlined"
            className="w-96"
            onChange={(e) => setData("family_methods_type", e.target.value)}
          />
          <TextField
            value={formObject.family_methods || ""}
            label="The Methods?"
            variant="outlined"
            className="w-96"
            onChange={(e) => onChange("family_methods", e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleSave}>Save and Next</Button>
    </>
  );
};

export default PregnancyHistory;
