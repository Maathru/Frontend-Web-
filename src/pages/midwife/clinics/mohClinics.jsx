import { useEffect, useState } from "react";
import { Typography, Chip } from "@mui/material";
import Calendar from "@/components/Calendar";
import { errorType, Toast } from "@/components/toast";
import ClinicService from "@/service/clinicService";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import { formatTime } from "@/utils/FormatTime";

const columns1 = [
  { field: "id", headerName: "Clinic ID", width: 90 },
  { field: "name", headerName: "Clinic Name", flex: 1 },
  {
    field: "startTime",
    headerName: "Start Time",
    flex: 1,
    valueFormatter: (params) => formatTime(params),
  },
  {
    field: "endTime",
    headerName: "End Time",
    flex: 1,
    valueFormatter: (params) => formatTime(params),
  },
  {
    field: "doctors",
    headerName: "Doctors",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="flex flex-col gap-1">
          {params.value.map((doctor, index) => (
            <Chip
              key={index}
              label={doctor}
              size={"small"}
              sx={{
                backgroundColor: "#C5BCFF",
                color: "#1F4692",
              }}
            />
          ))}
        </div>
      );
    },
  },
];

const columns2 = [
  { field: "id", headerName: "Clinic ID", width: 90 },
  { field: "name", headerName: "Clinic Name", flex: 1 },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "startTime",
    headerName: "Start Time",
    flex: 1,
    valueFormatter: (params) => formatTime(params),
  },
  {
    field: "endTime",
    headerName: "End Time",
    flex: 1,
    valueFormatter: (params) => formatTime(params),
  },
  {
    field: "doctors",
    headerName: "Doctors",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="flex flex-col gap-1">
          {params.value.map((doctor, index) => (
            <Chip
              key={index}
              label={doctor}
              size={"small"}
              sx={{
                backgroundColor: "#C5BCFF",
                color: "#1F4692",
              }}
            />
          ))}
        </div>
      );
    },
  },
];

const MohClinics = () => {
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [dates, setDates] = useState([]);
  const [rows2, setRows2] = useState([]);

  const stringArrayToDateArray = (array) => {
    return array.map((clinic) => clinic.date);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
    fetchClinicsByDate(currentDate);
    fetchClinicsForGivenMonth(currentDate);
  }, []);

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsByMonthForMidwife(date);
      setRows2(response);
      const dateObjects = stringArrayToDateArray(response);
      setDates(dateObjects);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const fetchClinicsByDate = async (date) => {
    setRows([]);

    try {
      const response = await ClinicService.getClinicsByDateToMidwife(date);
      setRows(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleMonthChange = async (date) => {
    setDate(date.format("YYYY-MM-DD"));
    await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const handleDateChange = async (date) => {
    setDate(date.format("YYYY-MM-DD"));
    await fetchClinicsByDate(date.format("YYYY-MM-DD"));
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Clinic Schedule {`${date}`}
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
          />
        </div>
      </div>
      <div>
        <Typography variant="h4">This Month Moh Clinics</Typography>

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
          ></StripedDataGrid>
        </div>
      </div>
    </div>
  );
};

export default MohClinics;
