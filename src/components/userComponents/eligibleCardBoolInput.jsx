import { TextField } from "@mui/material";
import YesNoButton from "./yesNoButton";

const EligibleCardBoolInput = ({
  title,
  index,
  placeholder,
  onChange,
  value1,
  value2,
  value3,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <div>
        {index >= 0 ? (
          `${index + 1}. ${title}`
        ) : (
          <ul className="list-disc ps-8">
            <li>{title}</li>
          </ul>
        )}
      </div>
      <YesNoButton onChange={(e) => onChange("woman", e)} value={value1} />
      <YesNoButton onChange={(e) => onChange("man", e)} value={value2} />
      <TextField
        label={placeholder}
        variant="outlined"
        className="w-72"
        value={value3}
        onChange={(e) => onChange("other", e.target.value)}
      />
    </div>
  );
};

export default EligibleCardBoolInput;
