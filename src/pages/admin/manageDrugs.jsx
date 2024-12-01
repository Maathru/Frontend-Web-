import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { Chip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import DrugService from "@/service/drugService";
import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import { useTitle } from "@/hooks/useTitle";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import DrugAddPopup from "@/components/DrugAddPopup";

const transformDate = (params) => {
  const originalDate = new Date(params.value);
  const targetDate = new Date(originalDate);
  targetDate.setFullYear(2024);
  targetDate.setMonth(6); // Months are zero-based in JavaScript (0 = January, 6 = July)
  targetDate.setDate(31);
  return targetDate.toISOString().split("T")[0];
};

const columns = [
  {
    field: "drugId",
    headerName: "Drug ID",
    width: 70,
    fontSize: 18,
    fontWeight: "bold",
  },
  { field: "brandName", headerName: "Brand Name", width: 130 },
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await DrugService.getDrugs();
        setRows(response);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchDrugs();
  }, [isOpen]);

  return (
    <div className="p-12 pt-8 content-container">
      <div className="flex justify-between mb-8">
        <Heading title={t("title")} />

        <DrugAddPopup
          addButton={t("add")}
          brandLabel={t("brand")}
          batchLabel={t("batch")}
          strengthLabel={t("strength")}
          quantityLabel={t("quantity")}
          compositionLabel={t("composition")}
          doseLabel={t("dose")}
          manufactureLabel={t("manufactured")}
          expiryLabel={t("expired")}
          submitButton={t("submit")}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
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
          slots={{ toolbar: TableSearch }}
        />
      </div>
    </div>
  );
};

export default Drug;
