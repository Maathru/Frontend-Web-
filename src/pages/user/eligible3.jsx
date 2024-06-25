import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import YesNoButton from "@/components/userComponents/yesNoButton";
import { TextField } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const conditions = [
  { title: "High blood pressure", placeholder: "IF yes, Who?" },
  { title: "Diabetes", placeholder: "IF yes, Who?" },
  { title: "Heart Diseases", placeholder: "IF yes, Who?" },
  { title: "Nervous disorders", placeholder: "IF yes, Who?" },
  { title: "Hemophilia", placeholder: "IF yes, Who?" },
  { title: "Thalassemia", placeholder: "IF yes, Who?" },
  {
    title: "A history of mental illness and suicide",
    placeholder: "IF yes, Who?",
  },
  { title: "Twins", placeholder: "IF yes, Who?" },
];

const meals = [
  {
    title:
      "Animal protein (meat, fish, milk, eggs, dried fruit) - 3 times a week",
    placeholder: "Other Details",
  },
  {
    title: "Plant protein/a grain (soy, lentil) - Daily",
    placeholder: "Other Details",
  },
  { title: "Two types of vegetables - Daily", placeholder: "Other Details" },
  { title: "One type of fruit - Daily", placeholder: "Other Details" },
];

const nutrition = [
  {
    title: "Do you all sit down for one meal as a family?",
    placeholder: "Other Details",
  },
  {
    title:
      "Does your diet include anything from the garden (vegetables, fruits and legumes)?",
    placeholder: "Other Details",
  },
  { title: "Are you consuming too much sugar?", placeholder: "Other Details" },
  { title: "Are you eating too much fat?", placeholder: "Other Details" },
];

const Eligible3 = () => {
  return (
    <div className="container my-10 font-poppins">
      <div className="flex items-center">
        <IoIosArrowBack
          size={45}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl ms-8">Family health information</h2>
      </div>

      <ul className="list-disc mt-12">
        <li>
          It is important to know about certain disease conditions (hereditary
          diseases) that your mother, father or blood relatives may have because
          you may be at risk of developing those conditions.
        </li>
        <li className="mt-4">
          This allows you to pay special attention to it during pregnancy and in
          addition, it will help to prevent or minimize these diseases for you
          and your children.
        </li>
      </ul>

      <p className="mt-8">
        Do you, father or brothers/sisters suffer from the following diseases?
      </p>

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

      <h3 className="text-xl mt-12">Family nutrition</h3>

      <ul className="list-disc mt-4">
        <li className="mt-4">
          Eating a mixed diet (starches, proteins, fats, as well as vitamins and
          minerals in the right amount on a daily basis) will help the health of
          the womb and good nutritional habits to improve the health of the
          family, as well as the mother to give birth to healthy children in the
          future. Focusing is our goal
        </li>
      </ul>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Woman</p>
          <p className="text-center">Men</p>
          <p></p>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p>1. Did you have 3 main meals for the day?</p>
          <YesNoButton />
          <YesNoButton />
          <TextField
            label="Other Details"
            variant="outlined"
            className="w-72"
          />
        </div>

        {meals.map((meal, index) => (
          <EligibleCardBoolInput
            title={meal.title}
            placeholder={meal.placeholder}
            key={index}
          />
        ))}

        {nutrition.map((n, index) => (
          <EligibleCardBoolInput
            title={n.title}
            placeholder={n.placeholder}
            index={index + 2}
            key={index}
          />
        ))}
      </div>

      <div className="flex w-full mt-24">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious to="/eligible/2" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/2">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#" isActive>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="/eligible/4">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext to="/eligible/4" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Eligible3;
