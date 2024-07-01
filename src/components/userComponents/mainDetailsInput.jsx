import { TextField } from "@mui/material";

const MainDetailsInput = ({ title, index, placeholder1, placeholder2 }) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
      <p>
        {index + 1}. {title}
      </p>
      <TextField label={placeholder1} variant="outlined" className="w-96" />
      <TextField label={placeholder2} variant="outlined" className="w-96" />
    </div>
  );
};

export default MainDetailsInput;
