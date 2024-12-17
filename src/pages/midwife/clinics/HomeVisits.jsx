import { useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import Calendar from "@/components/Calendar";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import VisitsService from "@/service/visitsService";
import { errorType, Toast } from "@/components/toast";
import { formatTime } from "@/utils/FormatTime";
import { useNavigate } from "react-router-dom";

const columns1 = [
  { field: "id", headerName: "Visit's ID", width: 100 },
  { field: "motherName", headerName: "Mother's Name", flex: 1 },
  { field: "address", headerName: "Address", flex: 1 },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
    valueFormatter: (params) => formatTime(params),
  },
  {
    field: "visitStatus",
    headerName: "Status",
    width: 170,
    renderCell: (params) => {
      const isPending = params.value === "PENDING";

      return (
        <Chip
          label={`${params.value}`}
          size={"small"}
          sx={{
            backgroundColor: !isPending ? "#EBF9F1" : "#C5BCFF",
            color: !isPending ? "#1F9254" : "#1F4692",
            width: "60%",
          }}
        />
      );
    },
  },
];

const columns2 = [
  { field: "id", headerName: "Visit ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
    valueFormatter: (params) => formatTime(params),
  },
  {
    field: "motherName",
    headerName: "Mother Name",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "visitStatus",
    headerName: "Status",
    width: 170,
    renderCell: (params) => {
      const isPending = params.value === "PENDING";

      return (
        <Chip
          label={`${params.value}`}
          size={"small"}
          sx={{
            backgroundColor: !isPending ? "#EBF9F1" : "#C5BCFF",
            color: !isPending ? "#1F9254" : "#1F4692",
            width: "60%",
          }}
        />
      );
    },
  },
];
const HomeVisits = () => {
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  const stringArrayToDateArray = (array) => {
    return array.map((visit) => visit.date);
  };

  const getReadableMonth = (dateStr) => {
    const date = new Date(dateStr);

    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    return monthName;
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
    fetchHomeVisitsForGivenDate(currentDate);
    fetchHomeVisitsForGivenMonth(currentDate);
  }, []);

  const fetchHomeVisitsForGivenMonth = async (date) => {
    try {
      const response = await VisitsService.getHomeVisitsByMonthForMidwife(date);
      setRows2(response);

      const dateObjects = stringArrayToDateArray(response);
      setDates(dateObjects);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const fetchHomeVisitsForGivenDate = async (date) => {
    try {
      const response = await VisitsService.getHomeVisitsByDateForMidwife(date);
      setRows(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleMonthChange = async (date) => {
    setDate(date.format("YYYY-MM-DD"));
    await fetchHomeVisitsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const handleDateChange = async (date) => {
    setDate(date.format("YYYY-MM-DD"));
    await fetchHomeVisitsForGivenDate(date.format("YYYY-MM-DD"));
  };

  const handleRowClick = (params) => {
    navigate(`/homevisit/${params.row.userId}`);
  };

  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Home Visits Schedule - {`${date}`}
        </Typography>
        <div className="flex gap-10">
          <div>
            <Calendar
              handleMonthChange={handleMonthChange}
              highlightedDays={dates}
              handleDateChange={handleDateChange}
            />
          </div>

          <div className="w-full h-full mt-4" style={{ height: "400px" }}>
            <StripedDataGrid
              columns={columns1}
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
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>

      <div>
        <Typography variant="h4">
          {`${getReadableMonth(date)}`} Month Home Visits
        </Typography>

        <div style={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            rows={rows2}
            columns={columns2}
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
            onRowClick={handleRowClick}
          ></StripedDataGrid>
        </div>
      </div>
    </div>
  );
};

export default HomeVisits;
