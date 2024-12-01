import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Calendar from "@/components/Calendar";
import { errorType, Toast } from "@/components/toast";
import ClinicService from "@/service/clinicService";
import { useDarkMode } from "@/context/darkModeContext";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import { IconButton } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

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

const MohClinics = () => {
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [dates, setDates] = useState([]);

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Clinic Schedule - {date.toDateString()}
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
  );
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

const HomeVisits = () => {
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [dates, setDates] = useState([]);

  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Home Visits Schedule - {date.toDateString()}
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

const handleMonthChange = async (date) => {
  await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
};

const handleDateChange = async (date) => {
  setDate(date.toDate());
  await fetchClinicsByDate(date.format("YYYY-MM-DD"));
};

const Clinics = () => {
  const { isDarkMode } = useDarkMode();
  const [selectedTab, setSelectedTab] = useState("clinics");

  const handleChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsGivenMonthForMidwife(date);
      setDates(response);
    } catch (error) {
      Toast(error.response?.data || "Unauthorized", errorType.ERROR);
    }
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
    <div className="content-container">
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          onChange={handleChange}
          sx={{
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <ToggleButton
            value="clinics"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              color: selectedTab === "clinics" ? "white" : "#9C33C1",
              backgroundColor:
                selectedTab === "clinics" ? "#9C33C1" : "#FEE2FE",
            }}
          >
            MOH Clinics
          </ToggleButton>
          <ToggleButton
            value="home-visits"
            sx={{
              px: 4,
              py: 1,
              fontWeight: "strong",
              color: selectedTab === "home-visits" ? "white" : "#000",
              backgroundColor:
                selectedTab === "home-visits" ? "#000" : "#FEE2FE",
              "&:hover": {
                backgroundColor:
                  selectedTab === "home-visits" ? "#000" : "#FDE1FE",
              },
            }}
          >
            Home Visits
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <div style={{ marginTop: "20px" }}>
        {selectedTab === "clinics" && <MohClinics />}
        {selectedTab === "home-visits" && <HomeVisits />}
      </div>
    </div>
  );
};

export default Clinics;
