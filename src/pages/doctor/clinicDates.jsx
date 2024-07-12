import { Calendar } from "@/components/ui/calendar";
import { HiChevronLeft } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import {
  DataGrid,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";

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
  { field: "appoinments", headerName: "No. of Appoinments", flex: 1 },
];

const rows = [
  {
    id: 1,
    name: "Clinic1",
    appoinments: "12",
  },
];

const clinicDates = () => {
  const [date, setDate] = useState(new Date());

  const { t } = useTranslation("clinic");

  return (
    <div className="p-12 pt-8">
      <div className="">
        <div className="text-3xl text-[#5B5B5B] font-semibold mb-8">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>
      </div>
      <div className="flex gap-36">
        <div>
          <div className="mx-12">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />

            <div className="w-full h-36 bg-[#FAEDFF] mt-12 shadow-md rounded-md"></div>
          </div>
        </div>
        <div className="flex-1 pr-8">
          <div style={{ height: "100%", width: "70%" }}>
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
    </div>
  );
};

export default clinicDates;
