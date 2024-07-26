import { TextField } from "@mui/material";

const Eligible4Input = ({ index, title, value1, value2 }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <p>
        {index + 1}. {title}
      </p>
      <p></p>
      <div className="mx-auto">
        <TextField
          disabled
          size="small"
          className="w-48 shadow-xl"
          variant="standard"
          value={value1 || ""}
        />
      </div>
      <div className="mx-auto">
        <TextField
          disabled
          size="small"
          className="w-48 shadow-lg"
          variant="standard"
          value={value2 || ""}
        />
      </div>
    </div>
  );
};

export default Eligible4Input;
