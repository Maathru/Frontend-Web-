import { StripedDataGrid } from "@/components/StripedDataGrid";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { SearchIcon } from "lucide-react";
import React from "react";
import ClinicAddPopup from "@/components/ClinicAddPopup";
import Calendar from "@/components/Calendar";

const columns = [
  { field: "id", width: 20 },
  { field: "devision", flex: 1 },
  {
    field: "patients",
    flex: 1,
    renderCell: (params) => {
      return params.value + " patients";
    },
  },
  {
    field: "view",
    // headerName: "View Appoinments",
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

const rows = [
  { id: 1, devision: "Piliyandala", patients: 30, view: "View Details" },
  { id: 2, devision: "Piliyandala", patients: 30, view: "View Details" },
  { id: 3, devision: "Piliyandala", patients: 30, view: "View Details" },
  { id: 4, devision: "Piliyandala", patients: 30, view: "View Details" },
  { id: 5, devision: "Piliyandala", patients: 30, view: "View Details" },
  { id: 6, devision: "Piliyandala", patients: 30, view: "View Details" },
];

const columns2 = [
  { field: "id", headerName: "Patient ID", width: 90 },
  { field: "patient", headerName: "Patient Name", flex: 1 },
  { field: "doctor", headerName: "Doctor Name", flex: 1 },
  {
    field: "action",
    headerName: "Is Present",
    flex: 1,
    renderCell: () => {
      return <Switch defaultChecked />;
    },
  },
];

const rows2 = [
  { id: 1, patient: "saumya", doctor: "saumya" },
  { id: 2, patient: "saumya", doctor: "saumya" },
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
  return (
    <div className="content-container">
      <Heading title={"Clinic Schedules"} />

      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for clinics"
            inputProps={{ "aria-label": "search ..." }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="mt-12">
        <Typography variant="h4">Clinic Days</Typography>
        <div className="flex">
          <div className="w-6/12">
            <Calendar />
            <ClinicAddPopup />
          </div>
          <div className="shadow-md p-5 w-6/12 h-fit">
            <div className="flex justify-between">
              <Typography variant="h6">Today's Clinic Details</Typography>
              <Button>View All Clinic Details</Button>
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
              ></DataGrid>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h4">Clinic Patient List</Typography>

        <Select
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
        ></TextField>

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
          ></StripedDataGrid>
        </div>
      </div>
    </div>
  );
};

export default manageClinics;
