import SpeciallyWomenInput from "@/components/userComponents/speciallyWomenInput";
import { TextField } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import YesNoButton from "@/components/userComponents/yesNoButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

const specials = [
  {
    title: "Have you received the rubella vaccine?",
    placeholder: "Other Details",
  },
  {
    title: "Do you take folic acid pills daily?",
    placeholder: "Other Details",
  },
  {
    title:
      "Was the marriage between the two of you a consanguineous relationship?",
    placeholder: "Other Details",
  },
];

const specials2 = [
  {
    title: "Do you bleed heavily when you have your period?",
    placeholder: "Other Details",
  },
  {
    title: "Do you have vaginal bleeding between two periods?",
    placeholder: "Other Details",
  },
  {
    title: "Suffering from severe back pain during menstruation?",
    placeholder: "Other Details",
  },
  {
    title: "Suffering from severe back pain during menstruation?",
    placeholder: "Other Details",
  },
];

const specials3 = [
  { title: "Are you dissatisfied with sex?", placeholder: "Other Details" },
  {
    title: "Do you both use a family planning system?",
    placeholder: "If yes, What's it?",
  },
  {
    title: "Looking to delay the birth of your first child?",
    placeholder: "If yes, For how long?",
  },
  {
    title: "Do you do breast self-examination once a month?",
    placeholder: "Other Details",
  },
];

const Eligible2 = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Orderly");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="container my-10 font-poppins">
      <div>
        <div className="">
          <IoIosArrowBack
            size={45}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <h2 className="text-2xl mt-12">
          Details of medical conditions (Do you have or have you ever had any of
          the following medical conditions? )
        </h2>
        <h3 className="text-xl mt-8">
          SPECIALLY FOR <span className="font-bold">WOMEN</span>
        </h3>

        <div>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <p></p>
            <p className="text-center">Woman</p>
            <p></p>
          </div>

          {specials.map((special, index) => (
            <SpeciallyWomenInput
              title={special.title}
              index={index}
              placeholder={special.placeholder}
              key={index}
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
        SPECIALLY FOR <span className="font-bold">WOMEN</span>
      </h3>

      <SpeciallyWomenInput
        title={"Are your periods monthly?"}
        index={0}
        placeholder={"No. of Days"}
      />

      <div className="grid grid-cols-4 gap-4 items-center">
        <p></p>
        <FormControl>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            className="mx-auto"
            value={value}
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
          title={special.title}
          index={index + 1}
          placeholder={special.placeholder}
          key={index}
        />
      ))}

      <h3 className="text-xl mt-12">
        FOR <span className="font-bold">BOTH</span>
      </h3>

      {specials3.map((special, index) => (
        <EligibleCardBoolInput
          title={special.title}
          index={index + 5}
          placeholder={special.placeholder}
          key={index}
        />
      ))}

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>9. Do you do breast self-examination once a month?</p>
        <YesNoButton className="" />
        <p></p>
        <TextField label="Other Details" variant="outlined" className="w-72" />
      </div>

      <div className="flex w-full mt-24">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious to="/eligible/1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/4">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext to="/eligible/3" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Eligible2;
