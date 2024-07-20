import { Button } from "@/components/ui/button";
import React from "react";
import {
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import { Box, Chip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageHeading from "@/components/ui/pageHeading";

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#FAEDFF",
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: "#ffffff",
  },
  border: "none",

  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
}));

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

const columns = [
  { field: "id", headerName: "Clinic ID", width: 70 },
  { field: "name", headerName: "Clinic Name", width: 130 },
  { field: "devision", headerName: "Devision", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
  { field: "appoinments", headerName: "No. of Appoinments", flex: 1 },
  {
    field: "view",
    headerName: "View Appoinments",
    flex: 1,
    renderCell: () => {
      return (
        <Chip
          size={"small"}
          label="View"
          sx={{
            backgroundColor: "#EBF9F1",
            color: "#1F9254",
            width: "60%",
          }}
        />
      );
    },
  },
  {
    field: "edit",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => (
      <IconButton
        // onClick={() => handleDelete(params.row.id)}
        aria-label="delete"
        size="small"
        sx={{
          color: "#624DE3",
        }}
      >
        <HiOutlinePencilAlt />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => (
      <IconButton
        // onClick={() => handleEdit(params.row.id)}
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

const rows = [
  {
    id: 1,
    name: "Clinic1",
    devision: "Piliyandala",
    date: "25/04/2024",
    time: "8am-5pm",
    appoinments: "12",
    View: "Out of Stock",
    // action: "edit",
  },
  {
    id: 2,
    name: "Clinic1",
    devision: "Piliyandala",
    date: "25/04/2024",
    time: "8am-5pm",
    appoinments: "12",
    View: "Out of Stock",
    // action: "edit",
  },
  {
    id: 3,
    name: "Clinic1",
    devision: "Piliyandala",
    date: "25/04/2024",
    time: "8am-5pm",
    appoinments: "12",
    View: "Out of Stock",
    // action: "edit",
  },
];

const Clinic = () => {
  const { t } = useTranslation("clinic");
  const title = t("title");

  return (
    <div className="content-container">
      <PageHeading title={title} />

      <div className="flex gap-36 justify-around px-24">
        <Link to={"/clinics/view"}>
          {/* <Button className="flex-1 text-md">{t("past")}</Button> */}
          <Button className="flex-1 text-md">{t("clinics")}</Button>
        </Link>

        <Link to={"/clinics/dates"}>
          <Button className="flex-1 text-md">{t("dates")}</Button>
        </Link>

        <Link to={"/clinics/reports"}>
          <Button className="flex-1 text-md">{t("reports")}</Button>
        </Link>
      </div>
      <div className="flex flex-col items-end mt-10">
        <Button className="bg-[#6F0096] h-10 flexbox items-center ">
          {t("add")}
          <HiOutlinePlusSm className="ml-2 h-5 w-5" />
        </Button>

        {/* clinics table */}
        <div style={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            rows={rows}
            columns={columns}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Clinic;
