import { TextField } from "@mui/material";

const DoubleInput = ({
  title,
  index,
  placeholder1,
  placeholder2,
  value1 = "",
  value2 = "",
  onChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
      <div className="w-fit">
        {index >= 0 ? (
          `${index + 1}. ${title}`
        ) : (
          <ul className="list-disc ps-8">
            <li>{title}</li>
          </ul>
        )}
      </div>
      <TextField
        value={value1}
        label={placeholder1}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("pregnancies_g", e.target.value)}
      />
      <TextField
        value={value2}
        label={placeholder2}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange("pregnancies_p", e.target.value)}
      />
    </div>
  );
};

export default DoubleInput;
