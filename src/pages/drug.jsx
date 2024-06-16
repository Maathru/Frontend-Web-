import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar,GridToolbarQuickFilter} from "@mui/x-data-grid";

import {
  HiChevronLeft,
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { Box, Chip, IconButton } from "@mui/material";
import { Button } from "flowbite-react";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { orange } from '@mui/material/colors';

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#FAEDFF",
  },

  "& .MuiDataGrid-columnHeader": {
    fontWeight: "bold",
    // backgroundColor: "green",
  },
  border: "none",

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
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
  };


const columns = [
  {
    field: "id",
    headerName: "Drug ID",
    width: 70,
    fontSize: 18,
    fontWeight: "bold",
  },
  { field: "product", headerName: "Product", width: 130 },
  { field: "batch", headerName: "Batch Number", flex: 1 },
  { field: "strength", headerName: "Strength", flex: 1 },
  { field: "received", headerName: "Received Date", flex: 1 },
  { field: "expired", headerName: "Expired Date", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: true,
    renderCell: (params) => {
      const isAvailable = params.value === "Available";
      return (
        <Chip
          label={params.value}
          size={"small"}
          sx={{
            backgroundColor: isAvailable ? "#EBF9F1" : "#F9EBEB", // Custom colors
            color: isAvailable ? "#1F9254" : "#A30D11",
          }}
        />
      );
    },
  },
  //   { field: "action", headerName: "Edit/Delete", flex: 1 },
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
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Out of Stock",
    action: "edit",
  },
  {
    id: 2,
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Available",
    action: "edit",
  },
  {
    id: 3,
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Available",
    action: "edit",
  },
  {
    id: 4,
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Out of Stock",
    action: "edit",
  },
  {
    id: 5,
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Available",
    action: "edit",
  },
  {
    id: 6,
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Available",
    action: "edit",
  },
  {
    id: 7,
    product: "Snow",
    batch: "Jon",
    strength: 35,
    received: "25/04/2024",
    expired: "25/04/2024",
    status: "Available",
    action: "edit",
  },
];

const drug = () => {
  return (
    <div className="p-12 grid content-start">
      <div className="flex justify-between mb-8">
        <div className="text-3xl text-[#5B5B5B] font-semibold ">
          <HiChevronLeft className="text-5xl inline" />
          Drug Management
        </div>

        <Button className="bg-[#6F0096] h-10 flexbox items-center">
          Add New
          <HiOutlinePlusSm className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div style={{ height: "100%", width: "100%"}}>
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
        
        slots={{ toolbar: QuickSearchToolbar}}

        />
      </div>
    </div>
  );
};

export default drug;
