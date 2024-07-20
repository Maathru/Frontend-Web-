import { Button } from "@/components/ui/button";
import {
  DataGrid,
  gridClasses,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";
import {
  HiChevronLeft,
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { styled } from "@mui/material/styles";
import { Box, Chip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
// import Typography from "@material-ui/core/Typography";
import { Typography } from "@mui/material";

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
  //   { field: "name", headerName: "Mother's Name <br/>Father's Name", width: 130 },
  {
    field: "name",
    headerName: "Mother / Father",
    flex: 1,
    // width: 300,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.woman}</Typography>
        <Typography>{params.value.man}</Typography>
      </div>
    ),
  },
  { field: "address", headerName: "Address", flex: 1 },
  {
    field: "phone",
    headerName: "Telephone",
    flex: 1,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.womanPhone}</Typography>
        <Typography>{params.value.manPhone}</Typography>
      </div>
    ),
  },
  {
    field: "dob",
    headerName: "Date of Birth",
    flex: 1,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.womanDob}</Typography>
        <Typography>{params.value.manDob}</Typography>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      const isEligible = params.value === "Eligible";
      return (
        <Chip
          label={params.value}
          size={"small"}
          sx={{
            backgroundColor: isEligible ? "#EBF9F1" : "#C5BCFF", // Custom colors
            color: isEligible ? "#1F9254" : "#1F4692",
            width: "60%",
          }}
        />
      );
    },
  },
  //   {
  //     field: "edit",
  //     headerName: "",
  //     flex: 0.1,
  //     renderCell: (params) => (
  //       <IconButton
  //         // onClick={() => handleDelete(params.row.id)}
  //         aria-label="delete"
  //         size="small"
  //         sx={{
  //           color: "#624DE3",
  //         }}
  //       >
  //         <HiOutlinePencilAlt />
  //       </IconButton>
  //     ),
  //   },
  {
    field: "delete",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => (
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

const rows = [
  {
    id: 1,
    name: { woman: "P.D.D.D.Rodrigo", man: "B.M.Nandalal" },
    address: "154/A, Kaleniya",
    phone: { womanPhone: "0714578650", manPhone: "0714578650" },
    dob: { womanDob: "01/03/1989", manDob: "11/05/1988" },
    status: "Eligible",
  },
  {
    id: 2,
    name: { woman: "P.D.D.D.Rodrigo", man: "B.M.Nandalal" },
    address: "154/A, Kaleniya",
    phone: { womanPhone: "0714578650", manPhone: "0714578650" },
    dob: { womanDob: "01/03/1989", manDob: "11/05/1988" },
    status: "Baby1",
  },
];

const eligibleCouples = () => {
  const { t } = useTranslation("eligibleCouple");

  return (
    <div className="content-container">
      <div className="">
        <div className="text-3xl text-[#5B5B5B] font-semibold mb-8">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>
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

export default eligibleCouples;
