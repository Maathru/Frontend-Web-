import { TextField } from "@mui/material";
import YesNoButton from "./yesNoButton";

const EligibleCardBoolInput = ({ title, index, placeholder }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <p>
        {index ? (
          `${index + 1}. ${title}`
        ) : (
          <ul className="list-disc ps-8">
            <li>{title}</li>
          </ul>
        )}
      </p>
      <YesNoButton className="" />
      <YesNoButton />
      <TextField label={placeholder} variant="outlined" className="w-72" />
    </div>
  );
};

export default EligibleCardBoolInput;
