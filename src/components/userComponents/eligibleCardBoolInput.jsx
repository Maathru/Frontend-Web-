import { TextField } from "@mui/material";
import YesNoButton from "./yesNoButton";

const EligibleCardBoolInput = ({ title, index }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <p>
        {index + 1}. {title}
      </p>
      <YesNoButton className="" />
      <YesNoButton />
      <TextField label="Other Details" variant="outlined" className="w-72" />
    </div>
  );
};

export default EligibleCardBoolInput;
