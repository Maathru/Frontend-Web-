import { TextField } from "@mui/material";

const SingleInput = ({
  title,
  index,
  placeholder,
  value = "",
  onChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
      <p>
        {index + 1}. {title}
      </p>
      <TextField
        value={value}
        label={placeholder}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("woman", e)}
      />
    </div>
  );
};

export default SingleInput;