import { TextField } from "@mui/material";

const SingleInput = ({
  title,
  index,
  placeholder,
  value = "",
  onChange,
  type = "text",
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
        type={type}
        value={value}
        label={placeholder}
        variant="outlined"
        className="w-96"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SingleInput;
