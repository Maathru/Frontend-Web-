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

const columns = [
  { field: "id", headerName: "Clinic ID", width: 100 },
  { field: "name", headerName: "Clinic Name", flex: 1 },
  { field: "region", headerName: "Region", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
];

const rows = [
  {
    id: 1,
    name: "Child Growth",
    region: "Maharamagama",
    date: "25/08/2024",
    time: "9am-1pm",
    // action: "edit",
  },
  {
    id: 2,
    name: "Diabetics Clinic",
    region: "Piliyandala",
    date: "26/08/2024",
    time: "10am-12pm",
    // action: "edit",
  },
  {
    id: 3,
    name: "Dental Clinic",
    region: "Nugegoda",
    date: "27/08/2024",
    time: "11am-2pm",
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
            slots={{ toolbar: TableSearch }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clinic;
