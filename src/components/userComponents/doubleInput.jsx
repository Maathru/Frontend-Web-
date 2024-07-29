import { TextField } from "@mui/material";

const DoubleInput = ({
  title,
  index,
  placeholder1,
  placeholder2,
  value1 = "",
  value2 = "",
  onChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
      <p>
        {index + 1}. {title}
      </p>
      <TextField
        value={value1}
        label={placeholder1}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("no_of_pregnancies_g", e.target.value)}
      />
      <TextField
        value={value2}
        label={placeholder2}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("no_of_pregnancies_p", e.target.value)}
      />
    </div>
  );
};

export default DoubleInput;