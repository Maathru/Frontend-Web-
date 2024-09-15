import * as React from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const AddRecordForm = ({ open, handleClose, handleAddRecord }) => {
  const [formData, setFormData] = React.useState({
    clinicDate: '',
    weeksIntoPregnancy: '',
    weight: '',
    height: '',
    bmi: '',
    glucoseLevel: '',
    albuminLevel: '',
    swelling: '',
    bloodPressure: '',
    fetalHeight: '',
    fetalLocation: '',
    fetalMovements: '',
    heartSound: '',
    ironFolate: '',
    vitaminC: '',
    calciumMalaria: '',
    thriposha: '',
    bloodSample: '',
    bloodSugarLevel: '',
    hemoglobinLevel: '',
    malaria: '',
    vdrlResult: '',
    lungs: '',
    dentalTests: '',
    dentalDrying: '',
    galagandaya: '',
    checkedBy: '',
    referral: '',
  });

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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh', // Set a maximum height for the modal
          overflowY: 'auto', // Enable vertical scrolling
          borderRadius: '8px',
          boxShadow: 24,
        }}
      >
        <h2>Add New Record</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Clinic Date"
            name="clinicDate"
            type="date"
            value={formData.clinicDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Weeks into Pregnancy"
            name="weeksIntoPregnancy"
            value={formData.weeksIntoPregnancy}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="BMI"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Glucose Level"
            name="glucoseLevel"
            value={formData.glucoseLevel}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Albumin Level"
            name="albuminLevel"
            value={formData.albuminLevel}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Swelling"
            name="swelling"
            value={formData.swelling}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Blood Pressure"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fetal Height"
            name="fetalHeight"
            value={formData.fetalHeight}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fetal Location"
            name="fetalLocation"
            value={formData.fetalLocation}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fetal Movements"
            name="fetalMovements"
            value={formData.fetalMovements}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Heart Sound"
            name="heartSound"
            value={formData.heartSound}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Iron Folate"
            name="ironFolate"
            value={formData.ironFolate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vitamin C"
            name="vitaminC"
            value={formData.vitaminC}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Calcium Malaria"
            name="calciumMalaria"
            value={formData.calciumMalaria}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Thriposha"
            name="thriposha"
            value={formData.thriposha}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Blood Sample"
            name="bloodSample"
            value={formData.bloodSample}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Blood Sugar Level"
            name="bloodSugarLevel"
            value={formData.bloodSugarLevel}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hemoglobin Level"
            name="hemoglobinLevel"
            value={formData.hemoglobinLevel}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Malaria"
            name="malaria"
            value={formData.malaria}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="VDRL Result"
            name="vdrlResult"
            value={formData.vdrlResult}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lungs"
            name="lungs"
            value={formData.lungs}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dental Tests"
            name="dentalTests"
            value={formData.dentalTests}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dental Drying"
            name="dentalDrying"
            value={formData.dentalDrying}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Galagandaya"
            name="galagandaya"
            value={formData.galagandaya}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Checked By"
            name="checkedBy"
            value={formData.checkedBy}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Referral"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Record
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecordForm;
