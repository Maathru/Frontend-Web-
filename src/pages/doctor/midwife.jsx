import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import EmployeeService from "@/service/employeeService";
import { useEffect, useState } from "react";

const columns = [
  {
    field: "id",
    headerName: "Midwife ID",
    width: 130,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  { field: "region", headerName: "Region", flex: 1 },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  { field: "address", headerName: "Address", flex: 1 },
];

const midwife = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchMidwives = async () => {
      try {
        const response = await EmployeeService.getMidwives();
        setRows(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    fetchMidwives();
  }, []);

  return (
    <div className="content-container">
      <Heading title={"Midwife Details"} />

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

export default midwife;
