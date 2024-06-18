import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

const drugAdd = () => {
  return (
    <div>
      <div>
        <div className="text-3xl text-[#5B5B5B] font-semibold ">
          <HiChevronLeft className="text-5xl inline" />
          Drug Management
        </div>
      </div>

      {/* <FormControl variant="standard">
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          defaultValue=""
          aria-describedby="component-error-text"
          sx
        />
        <FormHelperText id="component-error-text"></FormHelperText>
      </FormControl> */}
    </div>
  );
};

export default drugAdd;
