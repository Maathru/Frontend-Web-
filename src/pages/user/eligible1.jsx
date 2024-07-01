import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import MainDetailsInput from "@/components/userComponents/mainDetailsInput";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const conditions = [
  { title: "Low Red Blood cells (Anemia)", placeholder: "Other Details" },
  {
    title: "Heart disease or rheumatism from birth",
    placeholder: "Other Details",
  },
  { title: "Diabetics", placeholder: "Other Details" },
  { title: "High Blood Pressure", placeholder: "Other Details" },
  { title: "High Blood Cholesterol level", placeholder: "Other Details" },
  { title: "Chest Tightness Wheezing", placeholder: "Other Details" },
  { title: "Thyroid related Diseases", placeholder: "Other Details" },
  { title: "Dental problems", placeholder: "Other Details" },
  { title: "Mental illness", placeholder: "Other Details" },
  {
    title: "Diseases with Long-term complication",
    placeholder: "Other Details",
  },
  { title: "Food poisoning", placeholder: "Other Details" },
  { title: "Use of long term medication", placeholder: "Other Details" },
  { title: "Any other Major surgeries", placeholder: "Other Details" },
];

const details = [
  {
    title: "Age",
    placeholder1: "Enter woman's age",
    placeholder2: "Enter man's age",
  },
  {
    title: "Educational level",
    placeholder1: "Select the level of education - woman",
    placeholder2: "Select the level of education - man",
  },
  {
    title: "Occupation",
    placeholder1: "Enter woman's occupation",
    placeholder2: "Enter man's occupation",
  },
];

const Eligible = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(event.target);
  };

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
        <div className="flex gap-2 items-center">
          <IoIosArrowBack
            size={45}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-3xl">New Life Recovery Checklist</h1>
        </div>
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
              <p>Family Health Service unit:</p>
              <p>Nugegoda</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>User ID:</p>
              <p>2024/Nu/32</p>
            </div>
            <div className="flex my-4 gap-2">
              <p>Wife's Name:</p>
              <p>Mia kalifa</p>
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
            <p className="text-center">Male</p>
            <p className="text-center">Female</p>
          </div>

          {/* Input box */}

          <div>
            {details.map((detail, index) => (
              <MainDetailsInput
                title={detail.title}
                index={index}
                placeholder1={detail.placeholder1}
                placeholder2={detail.placeholder2}
                key={index}
              />
            ))}
            <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
              <p>4. Date of marriage</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="w-96" />
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
            <p className="text-center">Men</p>
            <p></p>
          </div>

          {conditions.map((condition, index) => (
            <EligibleCardBoolInput
              title={condition.title}
              placeholder={condition.placeholder}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full mt-24">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious to="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/2">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/4">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext to="/eligible/2" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Eligible;
