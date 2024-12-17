import Popup from "reactjs-popup";
import { Button } from "../ui/button";
import { HiPlus } from "react-icons/hi";
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
import { useEffect, useState } from "react";
import { errorType, Toast } from "../toast";
import VisitsService from "@/service/visitsService";

const HomeVisitDates = ({ addButton, userId }) => {
  const [editMode, setEditMode] = useState(false);
  const [homeVisits, setHomeVisits] = useState([
    { id: 1, status: "", date: "", time: "" },
  ]);

  const addHomeVisits = () => {
    if (!editMode) return;

    setHomeVisits([
      ...homeVisits,
      { id: homeVisits.length + 1, status: "", date: "", time: "" },
    ]);
  };

  const removeHomeVisits = (id) => {
    if (!editMode) return;

    setHomeVisits(homeVisits.filter((visit) => visit.id !== id));
  };

  const handleHomeVisitInputChange = (id, field, value) => {
    setHomeVisits(
      homeVisits.map((visit) =>
        visit.id === id ? { ...visit, [field]: value } : visit
      )
    );
  };

  const handleSubmit = async () => {
    const updatedFormData = { id: userId, visits: homeVisits };
    console.log(updatedFormData);

    try {
      const response = await VisitsService.saveHomeVisits(updatedFormData);
      Toast(response, errorType.SUCCESS);
      setEditMode(false);
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.map((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });

          console.log(newErrors);
        } else {
          console.log(data);
          Toast(data || "Error occurred", errorType.ERROR);
        }
      }
    }
  };

  const getHomeVisits = async () => {
    try {
      const response = await VisitsService.getHomeVisits(userId);
      setHomeVisits(response.visits);
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.map((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });

          console.log(newErrors);
        } else {
          console.log(data);
          Toast(data || "Error occurred", errorType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    getHomeVisits();
  }, []);

  return (
    <Popup
      trigger={
        <Button className="bg-[#6F0096] h-10 flexbox items-center ">
          {addButton}
        </Button>
      }
      modal
      nested
      overlayStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="bg-white dark:bg-dark-popup w-fit rounded-md pt-3 p-10 flex flex-col gap-5 items-center">
        {homeVisits.map((visit, index) => (
          <div
            key={visit.id}
            className="flex gap-8 justify-center items-end mt-4"
          >
            <Typography sx={{ fontSize: "14px", width: "100px", mb: "30px" }}>
              Home visit {index + 1}
            </Typography>

            <FormControl>
              <TextField
                disabled={!editMode}
                type="date"
                label="Enter Date"
                value={visit.date || ""}
                onChange={(e) => {
                  handleHomeVisitInputChange(visit.id, "date", e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                className="rounded"
                size="small"
                sx={{ width: "200px" }}
              ></TextField>
            </FormControl>

            <FormControl>
              <TextField
                disabled={!editMode}
                type="time"
                label="Enter Time"
                value={visit.time || ""}
                onChange={(e) => {
                  handleHomeVisitInputChange(visit.id, "time", e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                className="rounded"
                size="small"
                sx={{ width: "200px" }}
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
                disabled={!editMode}
                size="small"
                label="Select Status"
                value={visit.status || ""}
                onChange={(e) => {
                  handleHomeVisitInputChange(
                    visit.id,
                    "status",
                    e.target.value
                  );
                }}
                sx={{
                  width: "15rem",
                  padding: 0.5,
                  borderRadius: "30px",
                  width: "200px",
                }}
              >
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                <MenuItem value="PENDING">PENDING</MenuItem>
              </Select>
            </FormControl>

            {editMode && (
              <IconButton onClick={() => removeHomeVisits(visit.id)}>
                <AiOutlineClose />
              </IconButton>
            )}
          </div>
        ))}

        {editMode && (
          <>
            <div
              className="flex items-center gap-2 text-primary-purple cursor-pointer"
              onClick={addHomeVisits}
            >
              <HiPlus className="inline" />
              <Typography>Add more</Typography>
            </div>

            <Button onClick={() => handleSubmit()}>Save</Button>
          </>
        )}

        {!editMode && (
          <Button
            variant="hollow"
            className="text-lg"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </Popup>
  );
};

export default HomeVisitDates;
