import { Link } from "react-router-dom";
import BasicInfoInput from "../userComponents/basicInfoInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { basicInfo } from "@/data/eligibleData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Button } from "../ui/button";

const MainDetails = ({ formObject, setFormObject, handleChange }) => {
  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = (e) => {
    formObject.stage = Math.max(formObject.stage, 2);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    handleChange(e, 1);
  };

  return (
    <>
      <div className="bg-box-purple rounded-xl sm:m-8 lg:mx-40 relative shadow-md">
        <div className="mx-8 mt-5 text-sm md:text-base p-4">
          <div className="flex my-4 gap-2">
            <p>Regional Health Service Unit:</p>
            <p>{formObject.district || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>Medical Officer in Health:</p>
            <p>{formObject.area || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>Family Health Service Unit:</p>
            <p>{formObject.region || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>User ID:</p>
            <p>{formObject.userId || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>Wife's Name:</p>
            <p>{formObject.womanName || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>Husband's Name:</p>
            <p>{formObject.manName || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>Address:</p>
            <p>{formObject.address || ""}</p>
          </div>
          <div className="flex my-4 gap-2">
            <p>Date:</p>
            <p>{formObject.createdDate || ""}</p>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="mt-20">
        <div className="flex gap-20">
          <h2 className="text-2xl">Please Read this before filling the form</h2>
          <Link to="/read">
            <h2 className="text-2xl italic underline text-primary-purple">
              Read now
            </h2>
          </Link>
        </div>

        {/* Form container */}
        <div className="mt-10">
          <h3 className="text-xl">Main Details</h3>

          <div className="grid grid-cols-3 gap-4 items-center mx-14">
            <p></p>
            <p className="text-center">Wife</p>
            <p className="text-center">Husband</p>
          </div>

          {/* Input box */}

          <div>
            {basicInfo.map((detail, index) => (
              <BasicInfoInput
                key={index}
                index={index}
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
              <p>4. Date of marriage</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of marriage"
                  className="w-96"
                  value={
                    formObject.marriage ? dayjs(formObject.marriage) : null
                  }
                  onChange={(e) => {
                    formObject.marriage = e;
                  }}
                />
              </LocalizationProvider>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <Button className="float-right" onClick={handleSave}>
        Save and Next
      </Button>
    </>
  );
};

export default MainDetails;
