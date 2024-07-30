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
import Search from "@/components/Search";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import TableSearch from "@/components/TableSearch";

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
  { field: "female", headerName: "Female", flex: 1 },
  { field: "male", headerName: "Male", flex: 1 },
  { field: "phone", headerName: "Phone Number", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      return (
        <Chip
          label={params.value}
          size={"small"}
          sx={{
            backgroundColor: params.value === "parent" ? "#EBF9F1" : "#ebebf9", // Custom colors
            color: params.value === "parent" ? "#1F9254" : "#2d3bfa",
          }}
        />
      );
    },
  },
];

const rows2 = [
  {
    id: 1,
    female: "saumya sewwandi",
    male: "saumya sewwandi",
    phone: "0703012928",
    status: "parent",
  },
  {
    id: 2,
    female: "saumya sewwandi",
    male: "saumya sewwandi",
    phone: "0703012928",
    status: "eligible",
  },
];

const manageClinics = () => {
  const { t } = useTranslation("manageClinics");
  return (
    <div className="content-container">
      <Heading title={t("title")} />

      <div className="mt-12">
        <div className="flex">
          <div className="w-3/12 mr-10 flex flex-col items-end">
            <Calendar />
            <ClinicAddPopup />
          </div>
          <div className="shadow-md rounded-md p-5 w-9/12 h-fit">
            <div className="flex justify-between">
              <Typography variant="h6">{t("subtitle1.1")}</Typography>
              <Button>{t("viewBtn")}</Button>
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
                slots={{ toolbar: TableSearch }}
              ></DataGrid>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h4">{t("subtitle2")}</Typography>

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
            slots={{ toolbar: TableSearch }}
          ></StripedDataGrid>
        </div>
      </div>
    </div>
  );
};

export default manageClinics;
