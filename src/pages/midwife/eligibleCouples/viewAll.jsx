import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { Box, Chip, IconButton, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import EligibleService from "@/service/eligibleService";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import EligiblePopup from "@/components/eligiblePopup";
import { StripedDataGrid } from "@/components/StripedDataGrid";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        mb: 2,
        display: "flex",
        justifyContent: "flex-start",
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
  { field: "id", headerName: "E. Couple ID", width: 100 },
  {
    field: "name",
    headerName: "Mother / Father",
    flex: 1,
    // width: 300,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.womanName}</Typography>
        <Typography>{params.value.manName}</Typography>
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
    width: 170,
    renderCell: (params) => {
      const isEligible = params.value.role === "ELIGIBLE";
      return (
        <Chip
          label={
            isEligible ? params.value.role : `Baby ${params.value.children}`
          }
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

const eligibleCouples = () => {
  useTitle("Eligible Couples");
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation("eligibleCouples");

  useEffect(() => {
    const fetchEligibleListForMidwife = async () => {
      try {
        const response = await EligibleService.getEligibleListForMidwife();
        const updatedRows = response.map((r) => ({
          id: r.id,
          name: { womanName: r.womanName, manName: r.manName },
          address: r.address,
          phone: {
            womanPhone: r.womanPhone,
            manPhone: r.manPhone,
          },
          dob: { womanDob: r.womanDob, manDob: r.manDob },
          status: { role: r.role, children: r.children },
          userId: r.userId,
        }));

        setRows(updatedRows);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchEligibleListForMidwife();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/eligible/view/${params.row.userId}/${params.row.id}`);
  };

  return (
    <div className="content-container">
      <Heading title={t("title")} />

      <div className="flex flex-col items-end">
        <EligiblePopup addButton={t("add")}></EligiblePopup>

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
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default eligibleCouples;
