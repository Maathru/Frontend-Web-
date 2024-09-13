import { basicInfo, conditions1 } from "@/data/pregnancyData";
import BoolTextInput from "../userComponents/boolTextInput";
import { TextField } from "@mui/material";
import BasicInfoInput from "../userComponents/basicInfoInput";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button } from "../ui/button";

const ParentsDetails = ({
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
    handleChangeMainDetails(e, 1);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="bg-box-purple rounded-xl sm:m-8 relative shadow-md">
          <div className="mt-5 text-sm md:text-base p-4">
            <div className="flex my-4 gap-2">
              <p>Registration Number:</p>
              <p>1</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Registered Address:</p>
              <p>Udahamulla</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Eligible Couple ID:</p>
              <p>1</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>DN Division:</p>
              <p>2024/Nu/32</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>MOH Division:</p>
              <p>Udahamulla</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Family Health Service unit:</p>
              <p>Udahamulla</p>
            </div>
          </div>
        </div>

        <div className="bg-box-purple rounded-xl sm:m-8 relative shadow-md">
          <div className="mt-5 text-sm md:text-base p-4">
            <div className="flex my-4 gap-2 font-semibold">
              Any Identified Obstetric Risk Conditions/Medical Conditions:
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold">Parent Details</h3>

      <div className="grid grid-cols-3 gap-4 items-center mx-14">
        <p></p>
        <p className="text-center">Wife</p>
        <p className="text-center">Husband</p>
      </div>

      {/* Input box */}
      <div>
        <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
          <p>1. Name</p>
          <TextField
            value={formObject.name_woman || ""}
            label="Enter woman's name"
            variant="outlined"
            className="w-96"
            onChange={(e) => setData("woman", "name", e.target.value)}
          />
          <TextField
            value={formObject.name_man || ""}
            label="Enter man's name"
            variant="outlined"
            className="w-96"
            onChange={(e) => setData("man", "name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
          <p>2. Address</p>
          <TextField
            value={formObject.address || ""}
            label="Enter Address"
            variant="outlined"
            className="w-96"
            onChange={(e) =>
              setFormObject({ ...formObject, address: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
          <p>3. Telephone Number</p>
          <TextField
            value={formObject.phone_woman || ""}
            label="Enter woman's telephone number"
            variant="outlined"
            className="w-96"
            onChange={(e) => setData("woman", "phone", e.target.value)}
          />
          <TextField
            value={formObject.phone_man || ""}
            label="Enter man's telephone number"
            variant="outlined"
            className="w-96"
            onChange={(e) => setData("man", "phone", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
          <p>4. Date of Birth</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Wife's Date of Birth"
              className="w-96"
              value={dayjs(formObject.dob_woman)}
              onChange={(newValue) => {
                const isoDate = newValue ? newValue.toISOString() : null;
                setFormObject((prevFormObject) => ({
                  ...prevFormObject,
                  dob_woman: isoDate,
                }));
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Husband's Date of Birth"
              className="w-96"
              value={dayjs(formObject.dob_man)}
              onChange={(newValue) => {
                const isoDate = newValue ? newValue.toISOString() : null;
                setFormObject((prevFormObject) => ({
                  ...prevFormObject,
                  dob_man: isoDate,
                }));
              }}
            />
          </LocalizationProvider>
        </div>

        {basicInfo.map((detail, index) => (
          <BasicInfoInput
            key={index}
            index={index + 4}
            type={detail.type && detail.type}
            title={detail.title}
            value1={formObject[detail.name + "_woman"] || ""}
            value2={formObject[detail.name + "_man"] || ""}
            placeholder1={detail.placeholder1}
            placeholder2={detail.placeholder2}
            onChange={(filed, e) => {
              setData(filed, detail.name, e.target.value);
            }}
          />
        ))}

        <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
          <p>8. Distance for the office </p>
          <TextField
            value={formObject.duration || ""}
            label="Enter distance"
            variant="outlined"
            className="w-96"
            onChange={(e) =>
              setFormObject({ ...formObject, duration: e.target.value })
            }
          />
        </div>
      </div>

      {/* Medical history */}
      <h3 className="text-xl font-bold mt-10">
        Pre-Existing Medical Conditions
      </h3>

      <div className="grid grid-cols-3 gap-4 items-center mt-5 mb-6">
        <div className="w-fit"></div>
        <div>Wife</div>
      </div>

      <div className="mt-4">
        {conditions1.map((condition, index) => (
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

      <Button onClick={handleSave}>Save and Next</Button>
    </>
  );
};

export default ParentsDetails;
