import { styled } from "@mui/material/styles";
import {
  DataGrid,
  gridClasses,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { Box, Chip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DrugService from "@/service/drugService";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useTitle } from "@/hooks/useTitle";

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

const transformDate = (params) => {
  const originalDate = new Date(params.value);
  const targetDate = new Date(originalDate);
  targetDate.setFullYear(2024);
  targetDate.setMonth(6); // Months are zero-based in JavaScript (0 = January, 6 = July)
  targetDate.setDate(31);
  return targetDate.toISOString().split("T")[0];
};

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
  {
    field: "drugId",
    headerName: "Drug ID",
    width: 70,
    fontSize: 18,
    fontWeight: "bold",
  },
  { field: "composition", headerName: "Product", width: 130 },
  { field: "batchNumber", headerName: "Batch Number", flex: 1 },
  { field: "strength", headerName: "Strength", flex: 1 },
  {
    field: "createdAt",
    headerName: "Received Date",
    flex: 1,
    valueGetter: transformDate,
  },
  { field: "expiryDate", headerName: "Expired Date", flex: 1 },
  {
    field: "quantity",
    headerName: "Status",
    flex: 1,
    editable: true,
    renderCell: (params) => {
      const isAvailable = params.value > 0;
      return (
        <Chip
          label={isAvailable ? "Available" : "Out of Stock"}
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

const Drug = () => {
  useTitle("Drugs");
  const [rows, setRows] = useState([]);
  const { t } = useTranslation("drug");

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await DrugService.getDrugs();
        setRows(response);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchDrugs();
  }, []);

  const title = t("title");

  return (
    <div className="p-12 pt-8 content-container">
      <div className="flex justify-between mb-8">
        <Heading title={title} />

        <Link to={"/drugs/add"}>
          <Button className="bg-[#6F0096] h-10 flexbox items-center">
            {t("add")}
            <HiOutlinePlusSm className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <StripedDataGrid
          getRowId={(row) => row.drugId}
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

export default Drug;
