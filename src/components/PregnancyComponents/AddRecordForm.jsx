import { Modal, Box, Button, TextField } from "@mui/material";
import { record } from "@/data/pregnancyData";
import { useState } from "react";

const AddRecordForm = ({ open, handleClose, handleAddRecord }) => {
  const initiateFields = () => {
    const initialData = {};

    record.forEach((birth) => {
      initialData[record.name] = "";
    });

    return initialData;
  };

  const [formData, setFormData] = useState(initiateFields);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddRecord(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh", // Set a maximum height for the modal
          overflowY: "auto", // Enable vertical scrolling
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <h2>Add New Record</h2>
        <form onSubmit={handleSubmit}>
          {record.map((record, index) => (
            <TextField
              key={index}
              label={record.title}
              name={record.name}
              type={record.type || "text"}
              value={formData[record.name] || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: record.shrink,
              }}
            />
          ))}

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Record
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecordForm;
