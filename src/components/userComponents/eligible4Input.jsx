import { TextField } from "@mui/material";

const Eligible4Input = ({ index, title }) => {
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
        />
      </div>
      <div className="mx-auto">
        <TextField
          disabled
          size="small"
          className="w-48 shadow-lg"
          variant="standard"
        />
      </div>
    </div>
  );
};

export default Eligible4Input;
