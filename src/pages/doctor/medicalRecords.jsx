import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import { useEffect, useState } from "react";
import MedicalRecordService from "@/service/medicalRecordService";

const columns = [
  {
    field: "id",
    headerName: "Patient ID",
    width: 130,
  },
  {
    field: "name",
    headerName: "Patient Name",
    flex: 1,
  },
  {
    field: "disease",
    headerName: "Disease",
    flex: 1,
  },
  {
    field: "medicineGiven",
    headerName: "Medicine Given",
    flex: 1,
  },
  {
    field: "remarks",


    headerName: "Remarks",
    flex: 1,
  },
];

const MedicalRecords = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await MedicalRecordService.getAllRecords();

        // Transform response data
        const transformedRows = response.map((record) => ({
          id: record.recordId, // Unique identifier for the row
          name: record.patientName, // Patient Name
          disease: record.disease, // Disease
          medicineGiven: record.medicationGiven,
          remarks: record.remarks, // Remarks
        }));

        setRows(transformedRows);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.error(error.response.data);
      }
    };

    fetchPatient();
  }, []);

  return (
    <div className="content-container">
      <Heading title={"Patients Details"} />

      <div className="w-full h-full">
        <StripedDataGrid
          columns={columns}
          rows={rows} // Pass transformed rows
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          disableRowSelectionOnClick
          slots={{ toolbar: TableSearch }}
        />
      </div>
    </div>
  );
};

export default MedicalRecords;
