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
  const { t } = useTranslation("Manageusers");

  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        m: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
      <Button className="bg-[#6F0096] h-10 flexbox items-center">
        {t("Add New User")}
        <HiOutlinePlusSm className="ml-2 h-5 w-5" />
      </Button>
    </Box>
  );
}

const columns = [
  { field: "id", headerName: "User ID", width: 70 },
  { field: "name", headerName: "User Name", width: 130 },
  { field: "email", headerName: "User Email", flex: 1 },
  { field: "role", headerName: "User Role", flex: 1 },
  { field: "last_login", headerName: "Last Login", flex: 1 },
  
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
    name: "User1",
    email: "Piliyandala",
    role: "25/04/2024",
    last_login: "8am-5pm",
  },
  {
    id: 2,
    name: "User1",
    email: "Piliyandala",
    role: "25/04/2024",
    last_login: "10am-5pm",
  },
  {
    id: 2,
    name: "User1",
    email: "Piliyandala",
    role: "25/04/2024",
    last_login: "10am-5pm",
  },
];

const Manageusers = () => {
  const { t } = useTranslation("Manageusers");
  const title = t("Manage Users");

  return (
    <div className="content-container">
      <PageHeading title={title} />

      <div style={{ height: "100%", width: "100%", marginTop: "20px" }}>
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
  );
};

export default Manageusers;