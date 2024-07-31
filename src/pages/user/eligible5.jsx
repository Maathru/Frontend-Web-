import Eligible5Input from "@/components/userComponents/eligible4Input";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MinHeightTextarea from "../../components/userComponents/minHeightTextarea";
import { TextField } from "@mui/material";
import CustomPagination from "@/components/userComponents/customPagination";
import { useEffect, useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { sections } from "@/data/eligibleData";
import Heading from "@/components/ui/heading";

const examinations = ["BP", "CVC", "RS", "Abd", "CNS"];

const Eligible5 = () => {
  useTitle("Recovery Checklist - Page 5");
  const [formObject, setFormObject] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return { stage: 1 };
    };

    const obj1 = getFromLocalStorage();
    setFormObject({ ...formObject, ...obj1 });
  }, []);

  return (
    <div className="container my-10 font-poppins w-full">
      <Heading title={"Your Details"} />

      <ul className="list-disc mt-12">
        <li>This Section was filled by the Midwife.</li>
      </ul>

      <div>
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p></p>
          <p className="text-center">Wife</p>
          <p className="text-center">Husband</p>
        </div>

        {sections.map((section, index) => (
          <Eligible5Input
            title={section.title}
            index={index}
            key={index}
            value1={formObject[`woman${section.name}`]}
            value2={formObject[`man${section.name}`]}
          />
        ))}
      </div>

      <ul className="list-disc mt-12">
        <li>Special cases recognized by the midwife</li>
      </ul>
      <MinHeightTextarea cols={3} value={formObject.special || ""} />

      <ul className="list-disc mt-12">
        <li>Dates attended for counseling session</li>
      </ul>
      <MinHeightTextarea cols={3} value={formObject.session || ""} />

      <ul className="list-disc mt-12">
        <li>This Section was filled by the MOH Doctor.</li>
      </ul>

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p></p>
        <p></p>
        <p className="text-center">Wife</p>
        <p className="text-center">Husband</p>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>1. General Examination</p>
        <p></p>
        <div className="mx-auto">
          <TextField
            disabled
            size="small"
            className="w-48 shadow-xl"
            variant="standard"
          />
        </div>
        <div className="mx-auto">
          <TextField
            disabled
            size="small"
            className="w-48 shadow-lg"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>2. Brest</p>
        <p></p>
        <div className="mx-auto">
          <TextField
            disabled
            size="small"
            className="w-48 shadow-xl"
            variant="standard"
          />
        </div>
      </div>

      {examinations.map((examination, index) => (
        <Eligible5Input title={examination} index={index + 2} key={index} />
      ))}

      <ul className="list-disc mt-12">
        <li>Observations and conclusions of the doctor</li>
      </ul>
      <MinHeightTextarea cols={3} />

      <ul className="list-disc mt-12">
        <li>References</li>
      </ul>
      <MinHeightTextarea cols={2} />

      <ul className="list-disc mt-12">
        <li>Follow ups</li>
      </ul>
      <MinHeightTextarea cols={2} />

      <div className="flex w-full mt-24">
        <CustomPagination path={"/eligible/"} total={5} current={5} />
      </div>
    </div>
  );
};

export default Eligible5;
