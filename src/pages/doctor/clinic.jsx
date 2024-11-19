import { Button } from "@/components/ui/button";
import React from "react";
import {
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { Chip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Heading from "@/components/ui/heading";
import { useTitle } from "@/hooks/useTitle";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import Calendar from "@/components/Calendar";

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
  useTitle("Clinics");
  const { t } = useTranslation("clinic");
  const title = t("title");

  return (
    <div className="content-container">
      <Heading title={title} />

      <div className="">
        <Link to={"/clinics/reports"}>
          <Button className="float-right text-md">{t("reports")}</Button>
        </Link>
      </div>
      <div className="flex w-full">
        <div className="w-3/12">
          <Calendar />
        </div>
        {/* clinics table */}
        <div className="w-9/12">
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
            slots={{ toolbar: TableSearch }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clinic;
