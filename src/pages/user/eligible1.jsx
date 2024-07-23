import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import { useEffect, useState } from "react";
import BasicInfoInput from "@/components/userComponents/basicInfoInput";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import EligiblePagination from "@/components/userComponents/eligiblePagination";
import { basicInfo, conditions1 } from "@/data/eligibleData";
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import PageHeading from "@/components/ui/pageHeading";
import { useTranslation } from "react-i18next";

const Eligible = () => {
  const [formObject, setFormObject] = useState({ stage: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEligibleInfo = async () => {
      try {
        const response = await EligibleService.getEligibleInfo();
        const existing = EligibleService.mapDtoToFormObject(response);
        localStorage.setItem("formObject", JSON.stringify(existing));
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchEligibleInfo();
  }, []);

  const initiateFields = () => {
    const initialData = {};

    basicInfo.forEach((info) => {
      initialData[info.name + "_man"] = "";
      initialData[info.name + "_woman"] = "";
    });
    conditions1.forEach((condition) => {
      initialData[condition.name + "_man"] = "";
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });
    initialData.marriage = null;

    return initialData;
  };

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = () => {
    formObject.stage = Math.max(formObject.stage, 2);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    navigate("/eligible/2");
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const obj2 = initiateFields();
    const obj1 = getFromLocalStorage();
    setFormObject({ ...formObject, ...obj2, ...obj1 });
  }, []);

  const { t } = useTranslation("eligible1");
  const title = t("title");

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
      <PageHeading title={title} />

        <p className="text-xl mt-8">
          With the arrival of a new baby, you are stepping into a beautiful and
          joyous journey. Every mother wants to bring her baby into this world
          healthily and happily. We are here to support you in this precious
          journey.
        </p>
        <div className="bg-box-purple rounded-xl sm:m-8 lg:mx-40 relative shadow-md">
          <div className="mx-8 mt-5 text-sm md:text-base p-4">
            <div className="flex my-4 gap-2">
              <p>Regional Health Service Unit:</p>
              <p>Kotte</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Medical Officer in Health:</p>
              <p>Udahamulla</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Family Health Service Unit:</p>
              <p>Nugegoda</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>User ID:</p>
              <p>2024/Nu/32</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Wife's Name:</p>
              <p></p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Husband's Name:</p>
              <p>Buddhika Senanayake</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Address:</p>
              <p>48/16, Udahamulla, Nugegoda</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Date:</p>
              <p>2024/06/24</p>
            </div>
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
            <p className="text-center">Woman</p>
            <p className="text-center">Man</p>
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
                  value={dayjs(formObject.marriage || null)}
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

      {/* Diseases */}
      <div className="mt-24">
        <h2 className="text-2xl">
          Details of medical conditions (Do you have or have you ever had any of
          the following medical conditions? )
        </h2>

        <div className="m-12">
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <p></p>
            <p className="text-center">Woman</p>
            <p className="text-center">Man</p>
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
        </div>
      </div>

      <Button onClick={handleSave}>Save and Next</Button>

      <div className="flex w-full mt-24">
        <EligiblePagination total={4} current={1} />
      </div>
    </div>
  );
};

export default Eligible;
