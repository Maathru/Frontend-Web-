import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import { useEffect, useState } from "react";

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
    renderCell: (params) => {
      const isGiven = params.value; // Expected to be a boolean
      return (
        <div
          className={`px-4 py-1 rounded text-center font-semibold text-white ${
            isGiven ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isGiven ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    field: "remarks",


    headerName: "Remarks",
    flex: 1,
  },
];

const patientDetails = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await EmployeeService.getPatients();
        setRows(response); // Ensure response contains correct data structure
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    fetchPatient(); // Directly invoke the function here
  }, []);

  return (
    <div className="content-container">
      <Heading title={"Patients Details"} />

      <div className="w-full h-full">
        <StripedDataGrid
          columns={columns}
          rows={rows}
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

export default patientDetails;
