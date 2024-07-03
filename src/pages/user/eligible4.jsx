import Eligible4Input from "@/components/userComponents/eligible4Input";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MinHeightTextarea from "./minHeightTextarea";
import { TextField } from "@mui/material";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const sections = [
  "Weight (kg)",
  "Height (m)",
  "Body mass index (BMI) kg/m^2",
  "Blood type",
  "Hemoglobin level",
];

const examinations = ["BP", "CVC", "RS", "Abd", "CNS"];

const Eligible4 = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-10 font-poppins w-full">
      <div className="flex items-center">
        <IoIosArrowBack
          size={45}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex w-full justify-between">
          <h2 className="text-2xl ms-8">Your Details</h2>
          <h2 className="text-2xl ms-8">Date:06/08/2024</h2>
        </div>
      </div>

      <ul className="list-disc mt-12">
        <li>This Section was filled by the Midwife.</li>
      </ul>

      <div>
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p></p>
          <p className="text-center">Woman</p>
          <p className="text-center">Man</p>
        </div>

        {sections.map((section, index) => (
          <Eligible4Input title={section} index={index} key={index} />
        ))}
      </div>

      <ul className="list-disc mt-12">
        <li>Special cases recognized by the midwife</li>
      </ul>
      <MinHeightTextarea cols={3} />

      <ul className="list-disc mt-12">
        <li>Dates attended for counseling session</li>
      </ul>
      <MinHeightTextarea cols={3} />

      <ul className="list-disc mt-12">
        <li>This Section was filled by the MOH Doctor.</li>
      </ul>

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p></p>
        <p></p>
        <p className="text-center">Woman</p>
        <p className="text-center">Man</p>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>1. General Examination</p>
        <p></p>
        <div className="mx-auto">
          <TextField
            size="small"
            className="w-48 shadow-xl"
            variant="standard"
          />
        </div>
        <div className="mx-auto">
          <TextField
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
            size="small"
            className="w-48 shadow-xl"
            variant="standard"
          />
        </div>
      </div>

      {examinations.map((examination, index) => (
        <Eligible4Input title={examination} index={index + 2} key={index} />
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious to="/eligible/3" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/2">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#" isActive>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext to="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Eligible4;
