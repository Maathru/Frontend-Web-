import { TextField } from "@mui/material";

const FourInputs = ({
  title,
  index,
  placeholder1,
  placeholder2,
  placeholder3,
  placeholder4,
  value1,
  value2,
  value3,
  value4,
  onChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-center mt-4">
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
          className="w-56"
          onChange={(e) => onChange("field_1", e.target.value)}
        />
        <TextField
          value={value2}
          label={placeholder2}
          variant="outlined"
          className="w-56"
          onChange={(e) => onChange("field_2", e.target.value)}
        />
        <TextField
          value={value3}
          label={placeholder3}
          variant="outlined"
          className="w-56"
          onChange={(e) => onChange("field_3", e.target.value)}
        />
        <TextField
          value={value4}
          label={placeholder4}
          variant="outlined"
          className="w-56"
          onChange={(e) => onChange("field_4", e.target.value)}
        />
      </div>
    </>
  );
};

export default FourInputs;
