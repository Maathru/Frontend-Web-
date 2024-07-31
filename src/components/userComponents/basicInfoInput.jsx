import { TextField } from "@mui/material";

const BasicInfoInput = ({
  title,
  index,
  placeholder1 = "",
  placeholder2 = "",
  value1 = "",
  value2 = "",
  onChange,
  type = "text",
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
      <p>
        {index + 1}. {title}
      </p>
      <TextField
        type={type}
        value={value1}
        label={placeholder1}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("woman", e)}
      />
      <TextField
        type={type}
        value={value2}
        label={placeholder2}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("man", e)}
      />
    </div>
  );
};

export default BasicInfoInput;
