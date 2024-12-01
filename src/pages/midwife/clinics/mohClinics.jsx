import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import Calendar from "@/components/Calendar";
import { errorType, Toast } from "@/components/toast";
import ClinicService from "@/service/clinicService";
import { useDarkMode } from "@/context/darkModeContext";
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

const Clinics = () => {
  const { isDarkMode } = useDarkMode();
  const [selectedTab, setSelectedTab] = useState(0);
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsGivenMonthForMidwife(date);
      setDates(response);
    } catch (error) {
      Toast(error.response?.data || "Unauthorized", errorType.ERROR);
    }
  };

  const fetchClinicsByDate = async (date) => {
    try {
      const response = await ClinicService.getClinicsByDate(date);
      const updatedRows = response.map((clinic) => ({
        id: clinic.id,
        name: clinic.name,
        location: clinic.location,
        clinicDone: clinic.done,
      }));
      setRows(updatedRows);
    } catch (error) {
      Toast(error.response?.data || "Unauthorized", errorType.ERROR);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMonthChange = async (date) => {
    await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const handleDateChange = async (date) => {
    setDate(date.toDate());
    await fetchClinicsByDate(date.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split("T")[0];
      await fetchClinicsForGivenMonth(today);
      await fetchClinicsByDate(today);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ mt: 2, px: 3 }}>
        <Typography variant="h4">MOH Clinics</Typography>

        <Calendar
          handleMonthChange={handleMonthChange}
          highlightedDays={dates}
          handleDateChange={handleDateChange}
        />

        <Typography variant="h6" sx={{ mt: 4 }}>
          Clinic Schedule - {date.toDateString()}
        </Typography>
        
        <div className="w-full h-full mt-4" style={{ height: '400px' }}>
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

      </Box>
    </div>
  );
};

export default Clinics;