import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "@/components/ui/heading";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ClinicAddPopup from "@/components/ClinicAddPopup";
import { useTranslation } from "react-i18next";
import ClinicService from "@/service/clinicService";
import { errorType, Toast } from "@/components/toast";
import Calendar from "@/components/Calendar";
import { formatTime } from "@/utils/FormatTime";

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
        <Typography
          className="cursor-pointer"
          color={"purple"}
          lineHeight={4}
          fontSize={13}
        >
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

  const stringArrayToDateArray = (array) => {
    return array.map((clinic) => clinic.date);
  };

  useEffect(() => {
    return () => {
      fetchClinicsByDate(new Date().toISOString().split("T")[0]);
    };
  }, [isFetch]);

  useEffect(() => {
    return () => {
      fetchClinicsForGivenMonth(new Date().toISOString().split("T")[0]);
    };
  }, [isFetch]);

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsByMonth(date);
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
      const response = await ClinicService.getClinicsByDateToAdmin(date);
      setRows(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

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

  const handleMonthChange = async (date) => {
    await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const handleDateChange = async (date) => {
    await fetchClinicsByDate(date.format("YYYY-MM-DD"));
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
              handleMonthChange={handleMonthChange}
              highlightedDays={dates}
              handleDateChange={handleDateChange}
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
        <Typography variant="h4">This Month clinics</Typography>

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
