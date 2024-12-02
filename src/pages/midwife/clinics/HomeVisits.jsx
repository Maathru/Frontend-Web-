import { useState } from "react";
import { Typography } from "@mui/material";
import Calendar from "@/components/Calendar";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import { IconButton } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi";

const columns = [
  { field: "id", headerName: "Mother's ID", width: 100 },
  { field: "name", headerName: "Mother's Name", flex: 1 },
  { field: "location", headerName: "Location", flex: 1 },
  {
    field: "clinicDone",
    headerName: "Clinic Done?",
    flex: 1,
    renderCell: (params) => (
      <div>
        {params.value ? (
          <Typography variant="button" color="success.main">
            Yes
          </Typography>
        ) : (
          <Typography variant="button" color="error.main">
            No
          </Typography>
        )}
      </div>
    ),
  },
  {
    field: "delete",
    headerName: "",
    flex: 0.1,
    renderCell: () => (
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          color: "#A30D11",
        }}
      >
        <HiOutlineTrash />
      </IconButton>
    ),
  },
];
const HomeVisits = () => {
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [dates, setDates] = useState([]);

  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Home Visits Schedule - {`${date}`}
        </Typography>
        <div className="flex gap-10">
          <div>
            <Calendar
            // handleMonthChange={handleMonthChange}
            // highlightedDays={dates}
            // handleDateChange={handleDateChange}
            />
          </div>

          <div className="w-full h-full mt-4" style={{ height: "400px" }}>
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
      </div>
    </div>
  );
};

export default HomeVisits;
