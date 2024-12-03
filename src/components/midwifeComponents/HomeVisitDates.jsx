import Popup from "reactjs-popup";
import { Button } from "../ui/button";
import { HiOutlinePlusSm, HiPlus } from "react-icons/hi";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const HomeVisitDates = ({ addButton }) => {
  //   const removePregnancySection = (id) => {
  //     if (!editMode) return;

  //     setPastPregnancySections(
  //       pastPregnancySections.filter((section) => section.id !== id)
  //     );
  //   };

  //   const [pastPregnancySections, setPastPregnancySections] = useState([
  //     { id: 1, gender: "", result: "" },
  //   ]);

  return (
    <Popup
      //   open={isOpen}
      //   onOpen={() => setIsOpen(true)}
      //   onClose={() => {
      //     setIsOpen(false);
      //     setBackendError({ ...backendError, msg: "" });
      //   }}
      trigger={
        <Button className="bg-[#6F0096] h-10 flexbox items-center ">
          {addButton}
          <HiOutlinePlusSm className="ml-2 h-5 w-5" />
        </Button>
      }
      modal
      nested
      overlayStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="bg-white dark:bg-dark-popup w-fit rounded-md pt-3 p-10 flex flex-col gap-5 items-center">
        <div
          //   key={section.id}
          className="flex gap-8 justify-center items-end mt-4"
        >
          <Typography>Home visit 1</Typography>

          <FormControl>
            <TextField
              type="date"
              label="Enter Date"
              InputLabelProps={{
                shrink: true,
              }}
              className="rounded"
              size="small"
            ></TextField>
          </FormControl>

          <FormControl>
            <TextField
              type="time"
              label="Enter Time"
              InputLabelProps={{
                shrink: true,
              }}
              className="rounded"
              size="small"
            ></TextField>
          </FormControl>

          <FormControl>
            <InputLabel
              id="district-select-label"
              sx={{
                position: "relative",
                top: 20,
              }}
            >
              Select Status
            </InputLabel>
            <Select
              // disabled={!editMode}
              size="small"
              label="Select Gender"
              //   value={section.gender || ""}
              //   name={`gender_${section.id}`}
              //   onChange={(e) => {
              //     handleInputChange(e);
              //     handlePregnancyInputChange(
              //       section.id,
              //       "gender",
              //       e.target.value
              //     );
              //   }}
              sx={{
                width: "15rem",
                padding: 0.5,
                borderRadius: "30px",
              }}
            >
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
            </Select>
          </FormControl>

          {/* {editMode && ( */}
          <IconButton
          // onClick={() => removePregnancySection(section.id)}
          >
            <AiOutlineClose />
          </IconButton>
          {/* )} */}
        </div>
        <div className="flex items-center gap-2 text-primary-purple cursor-pointer">
          <HiPlus className="inline" />
          <Typography>Add more</Typography>
        </div>
      </div>
    </Popup>
  );
};

export default HomeVisitDates;
