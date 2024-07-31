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
import { useEffect, useState } from "react";
import ClinicAddPopup from "@/components/ClinicAddPopup";
import Search from "@/components/Search";
import { t } from "i18next";
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
  { field: "id", headerName: "Patient ID", width: 90 },
  { field: "patient", headerName: "Patient Name", flex: 1 },
  {
    field: "action",
    headerName: "Is Present",
    flex: 1,
    renderCell: () => {
      return <Chip />;
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
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const { t } = useTranslation("manageClinics");

  useEffect(() => {
    const fetchClinicsByDate = async () => {
      setRows([]);

      const newDate = new Date(date);
      newDate.setDate(date.getDate() + 1);
      const isoDateString = newDate.toISOString().split("T")[0];

      try {
        const response = await ClinicService.getClinicsByDate(isoDateString);
        setRows(response);
      } catch (error) {
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };

    fetchClinicsByDate();
  }, [date]);

  return (
    <div className="content-container">
      <Heading title={t("title")} />

      <Search placeholder={t("search")} />
      <div className="mt-12">
        <Typography variant="h4">{t("subtitle1")}</Typography>
        <ClinicAddPopup />

        <div className="flex">
          <div className="w-6/12">
            <Calendar
              highlightDates={[
                new Date(2024, 6, 20),
                new Date(2024, 7, 5),
                new Date(2024, 7, 8),
              ]}
              highlightColor="#ffcc00"
              onDayClick={(day) => setDate(day)}
            />
          </div>
          <div className="shadow-md p-5 w-6/12 h-fit">
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
            slots={{ toolbar: QuickSearchToolbar }}
          ></StripedDataGrid>
        </div>
      </div>
    </div>
  );
};

export default manageClinics;
