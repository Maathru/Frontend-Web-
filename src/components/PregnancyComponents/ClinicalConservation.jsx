import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddRecordForm from "@/components/PregnancyComponents/AddRecordForm";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import PregnancyService from "@/service/pregnancyService";
import { errorType, Toast } from "../toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const ClinicalConservation = () => {
  const [clinicRecords, setClinicRecords] = useState([{}]);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddRecord = async (newRecord) => {
    try {
      const response = await PregnancyService.saveClinicalConservation(
        newRecord
      );
      Toast(response, errorType.SUCCESS);
      setState((prevState) => !prevState);
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
    const fetchClinicalConservation = async () => {
      try {
        const response = await PregnancyService.getClinicalConservation();

        setClinicRecords(response);
      } catch (error) {
        console.log(error.message);

        console.log(error);
        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    return () => {
      fetchClinicalConservation();
    };
  }, [state]);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add New Record
      </Button>
      <AddRecordForm
        open={open}
        handleClose={handleClose}
        handleAddRecord={handleAddRecord}
      />

      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <StyledTableCell key={`clinic-${index}`}>
                {record.clinicDate}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Weeks into Pregnancy</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`weeks-${index}`}>
                {record.weeksIntoPregnancy} Weeks
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Weight (kg)</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`weight-${index}`}>{record.weight} kg</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Height (cm)</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`height-${index}`}>{record.height} m</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>BMI</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`bmi-${index}`}>{record.bmi}</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Urine - Glucose Level</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`glucose-${index}`}>
                {record.glucoseLevel} mmol/L
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Urine - Albumin Level</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`albumin-${index}`}>
                {record.albuminLevel} mg per 24 hours
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Swelling</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`swelling-${index}`}>{record.swelling}</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Blood Pressure (mm Hg)</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`bloodPressure-${index}`}>
                {record.bloodPressure} mm Hg
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Fetal Height (cm)</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`fetalHeight-${index}`}>
                {record.fetalHeight} cm
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Fetal Location</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`fetalLocation-${index}`}>
                {record.fetalLocation}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Fetal Movements</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`fetalMovements-${index}`}>
                {record.fetalMovements}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Heart Sound</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`heartSound-${index}`}>
                {record.heartSound}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Iron/Folate</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`ironFolate-${index}`}>
                {record.ironFolate}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Vitamin C</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`vitaminC-${index}`}>{record.vitaminC}</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Calcium/Malaria</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`calciumMalaria-${index}`}>
                {record.calciumMalaria}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Thriposha</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`thriposha-${index}`}>
                {record.thriposha}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Blood Sample</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`bloodSample-${index}`}>
                {record.bloodSample}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Blood Sugar Level</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`bloodSugarLevel-${index}`}>
                {record.bloodSugarLevel}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Hemoglobin Level</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`hemoglobinLevel-${index}`}>
                {record.hemoglobinLevel}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Malaria</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`malaria-${index}`}>{record.malaria}</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>VDRL Result</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`vdrlResult-${index}`}>
                {record.vdrlResult}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Lungs</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`lungs-${index}`}>{record.lungs}</TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Dental Tests</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`dentalTests-${index}`}>
                {record.dentalTests}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Dental Drying</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`dentalDrying-${index}`}>
                {record.dentalDrying}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Galagandaya</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`galagandaya-${index}`}>
                {record.galagandaya}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "white" }}>
            <StyledTableCell>Checked By</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`checkedBy-${index}`}>
                {record.checkedBy}
              </TableCell>
            ))}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f0f8ff" }}>
            <StyledTableCell>Referral</StyledTableCell>
            {clinicRecords.map((record, index) => (
              <TableCell key={`referral-${index}`}>{record.referral}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicalConservation;
