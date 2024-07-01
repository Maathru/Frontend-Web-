import { TextField } from "@mui/material";
import YesNoButton from "./yesNoButton";

const SpeciallyWomenInput = ({ title, index, placeholder }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <p className="w-fit">
        {index + 1}. {title}
      </p>
      <YesNoButton />
      <TextField label={placeholder} variant="outlined" className="w-72" />
    </div>
  );
};

export default SpeciallyWomenInput;
