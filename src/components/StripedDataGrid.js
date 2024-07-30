import { styled } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

export const StripedDataGrid = styled(DataGrid)(({ theme }) => {
  return {
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#FAEDFF",
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.mode === "dark" ? "#444444" : "#ffffff",
    },
    border: "none",

    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#555555", // Light vs dark mode header color
    },
    [`& .${gridClasses.row}`]: {
      cursor: "pointer",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
  };
});
