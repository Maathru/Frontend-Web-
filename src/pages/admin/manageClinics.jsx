import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "@/components/ui/heading";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ClinicAddPopup from "@/components/ClinicAddPopup";
import { useTranslation } from "react-i18next";
import ClinicService from "@/service/clinicService";
import { errorType, Toast } from "@/components/toast";
import { Calendar } from "@/components/ui/calendar";

const columns = [
  { field: "id", width: 20 },
  { field: "name", flex: 1 },
  {
    field: "region",
    flex: 1,
  },
  {
    field: "view",
    flex: 1,
    renderCell: () => {
      return (
        <Typography color={"purple"} lineHeight={4} fontSize={13}>
          View Details
        </Typography>
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
    field: "region",
    headerName: "Region",
    flex: 1,
  },
];

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        m: 2,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <GridToolbarQuickFilter
        sx={{
          width: 400,
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "none",
            },
          "& .MuiOutlinedInput-root:focus-within": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      />
    </Box>
  );
}

const manageClinics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    date: "",
    startTime: "",
    endTime: "",
    doctors: [],
    other: "",
  });
  const { t } = useTranslation("manageClinics");

  const onMonthChange = (day) => {
    const newDate = new Date(day);
    newDate.setMonth(newDate.getMonth() + 1);
    setMonth(newDate);
  };

  const onDayClick = (day) => {
    const newDate = new Date(day);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const stringArrayToDateArray = (array) => {
    return array.map((clinic) => new Date(clinic.date));
  };

  useEffect(() => {
    const fetchClinicsByDate = async () => {
      setRows([]);

      const isoDateString = date.toISOString().split("T")[0];

      try {
        const response = await ClinicService.getClinicsByDate(isoDateString);
        setRows(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    return () => {
      fetchClinicsByDate();
    };
  }, [date, isFetch]);

  useEffect(() => {
    const fetchClinicsForGivenMonth = async () => {
      const isoDateString = month.toISOString().split("T")[0];

      try {
        const response = await ClinicService.getClinicsByMonth(isoDateString);

        setRows2(response);
        const dateObjects = stringArrayToDateArray(response);
        setDates(dateObjects);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    return () => {
      fetchClinicsForGivenMonth();
    };
  }, [month, isFetch]);

  const fetchClinicData = async (clinicId) => {
    try {
      const response = await ClinicService.getClinic(clinicId);

      setFormData({
        ...response,
        startTime: new Date(`${response.date} ${response.startTime}`),
        endTime: new Date(`${response.date} ${response.endTime}`),
      });
      setIsOpen(true);
      setIsDisabled(true);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleRowClick = async (params) => {
    await fetchClinicData(params.row.id);
  };

  return (
    <div className="content-container">
      <Heading title={t("title")} />

      <div className="mt-12">
        <Typography variant="h4">{t("subtitle1")}</Typography>
        <ClinicAddPopup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsFetch={setIsFetch}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          formData={formData}
          setFormData={setFormData}
        />

        <div className="flex">
          <div className="w-6/12">
            <Calendar
              highlightDates={dates}
              highlightColor="#45075c"
              onDayClick={onDayClick}
              onMonthChange={onMonthChange}
            />
          </div>
          <div className="shadow-md p-5 w-6/12 h-fit">
            <div className="flex justify-between">
              <Typography variant="h6">{t("subtitle1.1")}</Typography>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                columnHeaderHeight={0}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5]}
                onRowClick={handleRowClick}
              ></DataGrid>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <Typography variant="h4">{t("subtitle2")}</Typography> */}
        <Typography variant="h4">This Month clinics</Typography>

        {/* <Select
          defaultValue={1}
          labelId="select-label"
          id="select"
          sx={{ width: "300px" }}
        >
          <MenuItem value={1}>CL01</MenuItem>
          <MenuItem value={2}>CL01</MenuItem>
          <MenuItem value={3}>CL01</MenuItem>
        </Select>

        <TextField
          type="date"
          sx={{ width: "300px", marginLeft: "30px" }}
        ></TextField> */}

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
            slots={{ toolbar: QuickSearchToolbar }}
            onRowClick={handleRowClick}
          ></StripedDataGrid>
        </div>
      </div>
    </div>
  );
};

export default manageClinics;
